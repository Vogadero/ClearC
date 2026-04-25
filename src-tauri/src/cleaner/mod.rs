// Cleaner module - placeholder
use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct CleanResult {
    pub freed_space: u64,
    pub cleaned_files: u64,
    pub failed_files: u64,
    pub elapsed_ms: u64,
    pub backup_path: Option<String>,
}

pub fn clean(paths: &[String], backup: bool) -> CleanResult {
    // TODO: implement actual clean logic
    CleanResult {
        freed_space: 0,
        cleaned_files: 0,
        failed_files: 0,
        elapsed_ms: 0,
        backup_path: None,
    }
}
