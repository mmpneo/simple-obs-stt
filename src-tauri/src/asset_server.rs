use std::sync::Arc;
use globset::Glob;
use serde::Deserialize;
use tauri::utils::assets::{EmbeddedAssets, AssetKey};
use tauri::Assets;
use warp::{Filter, Rejection, Reply};
use warp::http::{HeaderValue, Response, StatusCode};
use warp::http::header::{ACCEPT_RANGES, ACCESS_CONTROL_ALLOW_ORIGIN, CONTENT_SECURITY_POLICY, ORIGIN, X_FRAME_OPTIONS};
use warp::path::{FullPath, param};
use crate::ws_handler::{user_connected, Users};
use tauri::async_runtime::spawn;

#[derive(Deserialize)]
struct WsQueryData {
    id: String,
}

pub fn start_asset_host(assets: Arc<EmbeddedAssets>) {
    let users = Users::default();
    let users = warp::any().map(move || users.clone());

    let full = warp::path::full().and_then(move |path: FullPath| file_response(path, assets.clone()));

    let ws_path = warp::path("ws")
        .and(warp::ws())
        .and(users)
        .and(warp::query::<WsQueryData>())
        .map(|ws: warp::ws::Ws, users, q: WsQueryData| {
            ws.on_upgrade(move |socket| user_connected(q.id, socket, users))
        });

    spawn(warp::serve(ws_path.or(full)).run(([127, 0, 0, 1], 3030)));
}

async fn file_response(path: FullPath, assets: Arc<EmbeddedAssets>) -> Result<impl Reply, Rejection> {
    let glob = Glob::new("/**/*.{css,js,png,ico,wav,mp3,webmanifest}").unwrap().compile_matcher();
    let path = path.as_str();

  //todo inject files from filesystem dyn

    let index_asset = &AssetKey::from(String::from("index.html"));
    let substr = &path[1..];
    if !(glob.is_match(path)) {
        let asset = assets.get(index_asset).unwrap();
        return Ok(Response::builder()

            .status(StatusCode::OK)
            .header(ACCEPT_RANGES, HeaderValue::from_static("bytes"))
            .header(ACCESS_CONTROL_ALLOW_ORIGIN, HeaderValue::from_static("*"))
            .header(CONTENT_SECURITY_POLICY, HeaderValue::from_static("frame-ancestors *"))
            .header(X_FRAME_OPTIONS, HeaderValue::from_static("ALLOW-FROM *"))
            .body(asset.to_vec()));
    }

    let asset_key = &AssetKey::from(String::from(substr));
    let asset = assets.get(asset_key);
    return if asset.is_some() {
        let vv = asset.unwrap();
        Ok(Response::builder()
            .status(StatusCode::OK)
            .header(ACCEPT_RANGES, HeaderValue::from_static("bytes"))
            .header(ACCESS_CONTROL_ALLOW_ORIGIN, HeaderValue::from_static("*"))
            .header(CONTENT_SECURITY_POLICY, HeaderValue::from_static("frame-ancestors *"))
            .header(X_FRAME_OPTIONS, HeaderValue::from_static("ALLOW-FROM *"))
            .body(vv.to_vec()))
    } else {
        Err(warp::reject::not_found())
    };
}
