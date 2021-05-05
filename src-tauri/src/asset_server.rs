use std::sync::Arc;
use globset::Glob;
use tauri::api::assets::EmbeddedAssets;
use tauri::Assets;
use tokio::sync::{mpsc, RwLock};
use warp::{Filter, Rejection, Reply};
use warp::http::{HeaderValue, Response, StatusCode};
use warp::http::header::ACCEPT_RANGES;
use warp::path::{FullPath, param};

use serde::{Deserialize};

use crate::ws_handler::{user_connected, Users};

#[derive(Deserialize)]
struct WsQueryData {
    id: String
}


pub fn start_asset_host(assets: Arc<EmbeddedAssets>) {
    let base_href: &'static str = env!("BASE_HREF");
    let users = Users::default();
    let users = warp::any().map(move || users.clone());

    let full = warp::path::full().and_then(move |path: FullPath| file_response(path, assets.clone()));

    let ws_path = warp::path("ws")
        .and(warp::ws())
        .and(users)
        .and(warp::query::<WsQueryData>())
        .map(|ws: warp::ws::Ws, users, q: WsQueryData| {
            ws.on_upgrade(move |socket| user_connected(q.id,socket, users))
        });

    tokio::spawn(warp::serve(ws_path.or(full)).run(([127, 0, 0, 1], 3030)));
}

async fn file_response(path: FullPath, assets: Arc<EmbeddedAssets>) -> Result<impl Reply, Rejection> {
    let glob = Glob::new("/**/*.{css,js,png,ico,webmanifest}").unwrap().compile_matcher();
    let path = path.as_str();
    let substr = &path[1..];
    if !(glob.is_match(path)) {
        let asset = assets.get("index.html").unwrap();
        return Ok(Response::builder()

            .status(StatusCode::OK)
            .header(ACCEPT_RANGES, HeaderValue::from_static("bytes"))
            .body(asset.to_vec()));
    }

    let asset = assets.get(substr);
    return if asset.is_some() {
        let vv = asset.unwrap();
        Ok(Response::builder()
            .status(StatusCode::OK)
            .header(ACCEPT_RANGES, HeaderValue::from_static("bytes"))
            .body(vv.to_vec()))
    } else {
        Err(warp::reject::not_found())
    };
}
