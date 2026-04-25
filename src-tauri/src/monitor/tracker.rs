// Write source tracker - placeholder

pub struct Tracker;

impl Tracker {
    pub fn new() -> Self {
        Tracker
    }

    pub fn identify_process(&self, path: &str) -> Option<ProcessInfo> {
        // TODO: identify which process is writing to a file
        None
    }
}

pub struct ProcessInfo {
    pub pid: u32,
    pub name: String,
    pub write_rate: u64,
}
