// File change watcher - placeholder

pub struct Watcher;

impl Watcher {
    pub fn new() -> Self {
        Watcher
    }

    pub fn start(&self) -> Result<(), String> {
        // TODO: implement ReadDirectoryChangesW based watcher
        Ok(())
    }

    pub fn stop(&self) -> Result<(), String> {
        Ok(())
    }
}
