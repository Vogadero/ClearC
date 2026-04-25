// Built-in rule templates - placeholder

pub fn default_templates() -> Vec<RuleTemplate> {
    vec![
        RuleTemplate {
            name: "清理下载目录中超过90天的安装包".to_string(),
            description: "自动清理 Downloads 目录中 .exe/.msi/.zip 超过90天未访问的文件".to_string(),
        },
        RuleTemplate {
            name: "压缩超过30天的日志文件".to_string(),
            description: "将Logs目录中超过30天的.log文件压缩归档".to_string(),
        },
        RuleTemplate {
            name: "移动大视频文件到D盘".to_string(),
            description: "将C盘上超过1GB的视频文件移动到D盘对应目录".to_string(),
        },
    ]
}

pub struct RuleTemplate {
    pub name: String,
    pub description: String,
}
