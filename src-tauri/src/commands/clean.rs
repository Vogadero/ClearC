// Clean commands - placeholder
use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct CleanReport {
    pub freed_space: u64,
    pub cleaned_files: u64,
    pub elapsed_ms: u64,
}

#[tauri::command]
pub async fn start_clean(items: Vec<String>) -> Result<CleanReport, String> {
    // TODO: implement clean execution
    Ok(CleanReport {
        freed_space: 0,
        cleaned_files: 0,
        elapsed_ms: 0,
    })
}

#[tauri::command]
pub async fn cancel_clean() -> Result<(), String> {
    Ok(())
}
