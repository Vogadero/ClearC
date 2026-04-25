// Rule engine - placeholder

pub struct RuleEngine;

impl RuleEngine {
    pub fn new() -> Self {
        RuleEngine
    }

    pub fn dry_run(&self, _rule_id: i64) -> Result<DryRunResult, String> {
        Ok(DryRunResult {
            matched_files: 0,
            matched_size: 0,
        })
    }
}

pub struct DryRunResult {
    pub matched_files: u64,
    pub matched_size: u64,
}
