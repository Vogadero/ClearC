// Scan commands - placeholder
use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct ScanResult {
    pub total_size: u64,
    pub file_count: u64,
}

#[tauri::command]
pub async fn start_scan(module: String) -> Result<ScanResult, String> {
    // TODO: implement scan dispatch
    Ok(ScanResult {
        total_size: 0,
        file_count: 0,
    })
}

#[tauri::command]
pub async fn cancel_scan() -> Result<(), String> {
    // TODO: implement scan cancellation
    Ok(())
}
