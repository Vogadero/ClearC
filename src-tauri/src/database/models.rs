// Database models - placeholder
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ScanRecord {
    pub id: i64,
    pub module: String,
    pub total_size: u64,
    pub file_count: u64,
    pub created_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FileEntry {
    pub id: i64,
    pub scan_id: i64,
    pub path: String,
    pub size: u64,
    pub category: String,
    pub risk_level: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CleanupLog {
    pub id: i64,
    pub module: String,
    pub freed_space: u64,
    pub file_count: u64,
    pub backup_path: Option<String>,
    pub created_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BackupRecord {
    pub id: i64,
    pub path: String,
    pub size: u64,
    pub file_count: u64,
    pub created_at: String,
    pub expires_at: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Rule {
    pub id: i64,
    pub name: String,
    pub conditions: String,
    pub action: String,
    pub priority: i32,
    pub enabled: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ScheduledTask {
    pub id: i64,
    pub name: String,
    pub cron: String,
    pub modules: String,
    pub condition: Option<String>,
    pub enabled: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AppState {
    pub key: String,
    pub value: String,
}
