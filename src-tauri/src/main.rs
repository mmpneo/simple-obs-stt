#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

mod asset_server;
mod ws_handler;

use tauri::Context;
use tauri::api::assets::{EmbeddedAssets, Assets};
use crate::asset_server::start_asset_host;

#[tauri::command]
fn my_custom_command() {
    println!("I was invoked from JS!");
}

#[tokio::main]
async fn main() {
    let context: Context<EmbeddedAssets> = tauri::generate_context!();
    start_asset_host(context.assets.clone());
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![my_custom_command])
        .run(context)
        .expect("error while running tauri application")
}
