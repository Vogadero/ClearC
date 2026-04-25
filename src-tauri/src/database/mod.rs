pub mod migration;
pub mod models;

use rusqlite::Connection;
use std::path::PathBuf;
use std::sync::Mutex;

pub struct Database {
    pub conn: Mutex<Connection>,
}

impl Database {
    pub fn new() -> Result<Self, String> {
        let db_path = Self::db_path()?;
        let conn = Connection::open(&db_path).map_err(|e| e.to_string())?;
        Ok(Self {
            conn: Mutex::new(conn),
        })
    }

    pub fn initialize(&self) -> Result<(), String> {
        let conn = self.conn.lock().map_err(|e| e.to_string())?;
        migration::run(&conn)?;
        Ok(())
    }

    fn db_path() -> Result<PathBuf, String> {
        let app_data = std::env::var("APPDATA").map_err(|e| e.to_string())?;
        let dir = PathBuf::from(app_data).join("ClearC");
        std::fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
        Ok(dir.join("clearc.db"))
    }
}
