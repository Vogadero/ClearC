// Big file scanner - placeholder
use crate::scanner::ScanResult;

pub fn scan(threshold_mb: u64) -> ScanResult {
    ScanResult {
        module: "big_file".to_string(),
        items: vec![],
        total_size: 0,
        file_count: 0,
        elapsed_ms: 0,
    }
}
