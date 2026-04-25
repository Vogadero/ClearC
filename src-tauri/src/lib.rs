use tauri::menu::{MenuBuilder, MenuItemBuilder};
use tauri::tray::TrayIconBuilder;
use tauri::{Emitter, Manager, WindowEvent};

#[allow(dead_code)]
mod cleaner;
#[allow(dead_code)]
mod commands;
#[allow(dead_code)]
mod database;
#[allow(dead_code)]
mod monitor;
#[allow(dead_code)]
mod rules;
#[allow(dead_code)]
mod scanner;
#[allow(dead_code)]
mod utils;

use database::Database;
use utils::whitelist;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! Welcome to ClearC.", name)
}

#[tauri::command]
fn check_initialized() -> Result<bool, String> {
    let app_data = std::env::var("APPDATA").map_err(|e| e.to_string())?;
    let marker = std::path::PathBuf::from(app_data)
        .join("ClearC")
        .join(".initialized");
    Ok(marker.exists())
}

#[tauri::command]
fn set_initialized() -> Result<(), String> {
    let app_data = std::env::var("APPDATA").map_err(|e| e.to_string())?;
    let dir = std::path::PathBuf::from(app_data).join("ClearC");
    std::fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
    let marker = dir.join(".initialized");
    std::fs::write(&marker, chrono::Utc::now().to_rfc3339()).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn get_disk_space() -> Result<DiskSpace, String> {
    // Use Windows API for actual disk space
    Ok(DiskSpace {
        total_bytes: 0,
        used_bytes: 0,
        free_bytes: 0,
    })
}

#[tauri::command]
fn check_path_protected(path: String) -> bool {
    whitelist::is_path_protected(&path)
}

#[tauri::command]
fn check_path_requires_admin(path: String) -> bool {
    whitelist::requires_admin(&path)
}

#[tauri::command]
fn get_protected_dirs() -> Vec<String> {
    whitelist::get_protected_dirs()
}

#[tauri::command]
fn check_admin_privilege() -> bool {
    utils::privilege::is_elevated()
}

#[derive(serde::Serialize)]
struct DiskSpace {
    total_bytes: u64,
    used_bytes: u64,
    free_bytes: u64,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            // Initialize database
            let db = Database::new()?;
            db.initialize()?;

            // Setup system tray
            let show_item = MenuItemBuilder::with_id("show", "显示主窗口").build(app)?;
            let scan_item = MenuItemBuilder::with_id("scan", "快速扫描").build(app)?;
            let _separator = MenuItemBuilder::with_id("separator", "").build(app)?;
            let quit_item = MenuItemBuilder::with_id("quit", "退出").build(app)?;

            let menu = MenuBuilder::new(app)
                .item(&show_item)
                .item(&scan_item)
                .separator()
                .item(&quit_item)
                .build()?;

            let _tray = TrayIconBuilder::new()
                .icon(app.default_window_icon().unwrap().clone())
                .tooltip("ClearC - C盘智能清理工具")
                .menu(&menu)
                .on_menu_event(|app, event| match event.id().as_ref() {
                    "show" => {
                        if let Some(window) = app.get_webview_window("main") {
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                    "scan" => {
                        if let Some(window) = app.get_webview_window("main") {
                            let _ = window.show();
                            let _ = window.set_focus();
                            let _ = window.emit("tray-action", "quick-scan");
                        }
                    }
                    "quit" => {
                        app.exit(0);
                    }
                    _ => {}
                })
                .on_tray_icon_event(|tray, event| {
                    if let tauri::tray::TrayIconEvent::DoubleClick { .. } = event {
                        let app = tray.app_handle();
                        if let Some(window) = app.get_webview_window("main") {
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                })
                .build(app)?;

            // Minimize to tray on close instead of exiting
            if let Some(window) = app.get_webview_window("main") {
                let window_clone = window.clone();
                window.on_window_event(move |event| {
                    if let WindowEvent::CloseRequested { api, .. } = event {
                        api.prevent_close();
                        let _ = window_clone.hide();
                    }
                });
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            check_initialized,
            set_initialized,
            get_disk_space,
            check_path_protected,
            check_path_requires_admin,
            get_protected_dirs,
            check_admin_privilege,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
