// Privilege management
use std::process::Command;

pub fn is_elevated() -> bool {
    // Check if running with admin privileges
    // Simple check: try to open a privileged resource
    std::fs::read_dir(r"C:\Windows\System32\config")
        .map(|_| true)
        .unwrap_or(false)
}

pub fn request_elevation() -> Result<(), String> {
    let exe = std::env::current_exe().map_err(|e| e.to_string())?;
    Command::new("runas")
        .args(["/user:Administrator", &exe.to_string_lossy()])
        .spawn()
        .map_err(|e| e.to_string())?;
    Ok(())
}
