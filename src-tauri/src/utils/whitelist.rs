// Security whitelist - protects critical system directories from being cleaned
use std::path::PathBuf;

/// Directories that are absolutely protected and should never be cleaned
const PROTECTED_DIRS: &[&str] = &[
    r"C:\Windows\System32",
    r"C:\Windows\System",
    r"C:\Windows\SysWOW64",
    r"C:\Windows\WinSxS",
    r"C:\Windows\Microsoft.NET",
    r"C:\Windows\assembly",
    r"C:\Windows\Fonts",
    r"C:\Windows\Boot",
    r"C:\Windows\Branding",
    r"C:\Windows\Debug",
    r"C:\Windows\INF",
    r"C:\Windows\Installer",
    r"C:\Windows\Media",
    r"C:\Windows\Panther",
    r"C:\Windows\PolicyDefinitions",
    r"C:\Windows\Provisioning",
    r"C:\Windows\Registration",
    r"C:\Windows\RemotePackages",
    r"C:\Windows\Resources",
    r"C:\Windows\Schemas",
    r"C:\Windows\Security",
    r"C:\Windows\ShellStore",
    r"C:\Windows\Speech",
    r"C:\Windows\TAPI",
    r"C:\Windows\Twain_32",
    r"C:\Windows\Vss",
    r"C:\Windows\Web",
    r"C:\Program Files",
    r"C:\Program Files (x86)",
    r"C:\ProgramData\Microsoft\Windows\Start Menu",
    r"C:\ProgramData\Microsoft\Windows\Cookies",
    r"C:\ProgramData\Package State",
    r"C:\Recovery",
    r"C:\System Volume Information",
    r"C:\$Recycle.Bin",
    r"C:\Boot",
    r"C:\EFI",
    r"C:\Documents and Settings",
];

/// File extensions that should never be deleted
const PROTECTED_EXTENSIONS: &[&str] = &[
    ".sys", ".drv", ".dll", ".exe", ".msi", ".cat", ".inf",
    ".nls", ".mui", ".manifest", ".icl", ".fon", ".ttf", ".otf",
    ".cur", ".ani",
];

/// Check if a path is in the protected whitelist
pub fn is_path_protected(path: &str) -> bool {
    let path_buf = PathBuf::from(path);
    let normalized = path_buf.to_string_lossy().to_lowercase();

    // Check against protected directories
    for protected in PROTECTED_DIRS {
        let protected_lower = protected.to_lowercase();
        if normalized.starts_with(&format!("{}\\", protected_lower))
            || normalized == protected_lower
        {
            return true;
        }
    }

    false
}

/// Check if a file has a protected extension
pub fn is_extension_protected(path: &str) -> bool {
    let path_lower = path.to_lowercase();
    PROTECTED_EXTENSIONS
        .iter()
        .any(|ext| path_lower.ends_with(ext))
}

/// Check if a path is safe to clean (not in whitelist)
pub fn is_safe_to_clean(path: &str) -> bool {
    !is_path_protected(path)
}

/// Filter a list of paths, removing any that are in the whitelist
pub fn filter_protected_paths(paths: &[String]) -> Vec<String> {
    paths
        .iter()
        .filter(|p| !is_path_protected(p))
        .cloned()
        .collect()
}

/// Get the list of all protected directories (for display in UI)
pub fn get_protected_dirs() -> Vec<String> {
    PROTECTED_DIRS.iter().map(|s| s.to_string()).collect()
}

/// Check if a path requires admin privileges to clean
pub fn requires_admin(path: &str) -> bool {
    let path_lower = path.to_lowercase();
    path_lower.starts_with(r"c:\windows")
        || path_lower.starts_with(r"c:\programdata")
        || path_lower.starts_with(r"c:\program files")
        || path_lower.starts_with(r"c:\program files (x86)")
}
