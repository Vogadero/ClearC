pub mod app_cache;
pub mod big_file;
pub mod duplicate;
pub mod privacy;
pub mod startup;
pub mod system_junk;

use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
pub struct ScanItem {
    pub path: String,
    pub size: u64,
    pub category: String,
    pub risk_level: RiskLevel,
    pub description: String,
}

#[derive(Debug, Clone, Serialize)]
pub enum RiskLevel {
    Safe,
    Warning,
    Danger,
}

#[derive(Debug, Serialize)]
pub struct ScanResult {
    pub module: String,
    pub items: Vec<ScanItem>,
    pub total_size: u64,
    pub file_count: u64,
    pub elapsed_ms: u64,
}
