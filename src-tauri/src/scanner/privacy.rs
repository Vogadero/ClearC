// Privacy scanner - placeholder
use crate::scanner::ScanResult;

pub fn scan() -> ScanResult {
    ScanResult {
        module: "privacy".to_string(),
        items: vec![],
        total_size: 0,
        file_count: 0,
        elapsed_ms: 0,
    }
}
