#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]
#![allow(
// Clippy bug: https://github.com/rust-lang/rust-clippy/issues/7422
clippy::nonstandard_macro_braces,
)]

mod asset_server;
mod ws_handler;

use tauri::Context;
use tauri::api::assets::{EmbeddedAssets, Assets};
use crate::asset_server::start_asset_host;

// #[tokio::main]
fn main() {
    let context: Context<EmbeddedAssets> = tauri::generate_context!();
    start_asset_host(context.assets().clone());
    tauri::Builder::default()
        .run(context)
        .expect("error while running tauri application")
}
