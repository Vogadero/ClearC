// Windows special path resolution
use std::path::PathBuf;

pub fn temp_dir() -> PathBuf {
    std::env::temp_dir()
}

pub fn app_data_dir() -> PathBuf {
    std::env::var("APPDATA")
        .map(PathBuf::from)
        .unwrap_or_else(|_| PathBuf::from(r"C:\Users\Default\AppData\Roaming"))
}

pub fn local_app_data_dir() -> PathBuf {
    std::env::var("LOCALAPPDATA")
        .map(PathBuf::from)
        .unwrap_or_else(|_| PathBuf::from(r"C:\Users\Default\AppData\Local"))
}

pub fn home_dir() -> PathBuf {
    std::env::var("USERPROFILE")
        .map(PathBuf::from)
        .unwrap_or_else(|_| PathBuf::from(r"C:\Users\Default"))
}

pub fn clearc_data_dir() -> PathBuf {
    app_data_dir().join("ClearC")
}

pub fn clearc_backup_dir() -> PathBuf {
    clearc_data_dir().join("backup")
}

pub fn windows_temp() -> PathBuf {
    PathBuf::from(r"C:\Windows\Temp")
}

pub fn windows_update_cache() -> PathBuf {
    PathBuf::from(r"C:\Windows\SoftwareDistribution\Download")
}
