// Hash utilities
use sha2::{Digest, Sha256};
use std::fs::File;
use std::io::Read;

pub fn file_sha256(path: &str) -> Result<String, String> {
    let mut file = File::open(path).map_err(|e| e.to_string())?;
    let mut hasher = Sha256::new();
    let mut buffer = [0u8; 8192];
    loop {
        let n = file.read(&mut buffer).map_err(|e| e.to_string())?;
        if n == 0 {
            break;
        }
        hasher.update(&buffer[..n]);
    }
    let result = hasher.finalize();
    Ok(format!("{:x}", result))
}

pub fn file_partial_hash(
    path: &str,
    head_bytes: usize,
    tail_bytes: usize,
) -> Result<String, String> {
    let metadata = std::fs::metadata(path).map_err(|e| e.to_string())?;
    let file_size = metadata.len() as usize;
    let mut file = File::open(path).map_err(|e| e.to_string())?;
    let mut hasher = Sha256::new();

    // Read head
    if head_bytes > 0 && file_size > 0 {
        let read_len = head_bytes.min(file_size);
        let mut buf = vec![0u8; read_len];
        file.read_exact(&mut buf).map_err(|e| e.to_string())?;
        hasher.update(&buf);
    }

    // Read tail
    if tail_bytes > 0 && file_size > tail_bytes {
        use std::io::Seek;
        file.seek(std::io::SeekFrom::End(-(tail_bytes as i64)))
            .map_err(|e| e.to_string())?;
        let mut buf = vec![0u8; tail_bytes];
        file.read_exact(&mut buf).map_err(|e| e.to_string())?;
        hasher.update(&buf);
    }

    let result = hasher.finalize();
    Ok(format!("{:x}", result))
}
