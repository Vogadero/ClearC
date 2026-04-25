// Duplicate file scanner - placeholder
use crate::scanner::ScanResult;

pub fn scan(_mode: &str) -> ScanResult {
    ScanResult {
        module: "duplicate".to_string(),
        items: vec![],
        total_size: 0,
        file_count: 0,
        elapsed_ms: 0,
    }
}
