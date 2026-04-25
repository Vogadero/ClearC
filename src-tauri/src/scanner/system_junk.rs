// System junk scanner - placeholder
use crate::scanner::{ScanResult, ScanItem, RiskLevel};

pub fn scan() -> ScanResult {
    ScanResult {
        module: "system_junk".to_string(),
        items: vec![],
        total_size: 0,
        file_count: 0,
        elapsed_ms: 0,
    }
}
