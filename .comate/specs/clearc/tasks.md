# ClearC 实现任务计划

- [x] Task 1: 项目脚手架搭建与 DESIGN.md 集成
    - 1.1: 使用 `create-tauri-app` 初始化 Tauri + React + TypeScript + Vite 项目
    - 1.2: 安装前端依赖: @icon-park/react, tailwindcss, postcss, autoprefixer, zustand, recharts, @tanstack/react-virtual
    - 1.3: 配置 TailwindCSS (tailwind.config.js, postcss.config.js, global.css)，按 DESIGN.md 色彩体系定义 CSS 变量（浅色/深色双模式）
    - 1.4: 配置 Tauri (tauri.conf.json): 窗口尺寸、标题、权限、系统托盘
    - 1.5: 配置 Cargo.toml 依赖: rusqlite, zip, serde, serde_json, toml, winapi, windows, sha2, walkdir, notify, chrono, reqwest
    - 1.6: 创建 Rust 目录结构: commands/, scanner/, cleaner/, monitor/, database/, rules/, utils/
    - 1.7: 在项目根目录创建 DESIGN.md，写入完整 9 章节 ClearC 设计系统规范，供 AI Agent 生成 UI 时参考

- [x] Task 2: Rust 后端基础设施 - 数据库与配置
    - 2.1: 实现 database/mod.rs: SQLite 连接管理、初始化、迁移
    - 2.2: 实现 database/models.rs: scan_records, file_entries, cleanup_logs, backup_records, rules, scheduled_tasks, app_state 表结构定义
    - 2.3: 实现 database/migration.rs: 建表语句、版本迁移逻辑
    - 2.4: 实现 utils/path.rs: Windows 特殊目录路径解析（%TEMP%, %APPDATA%, %LOCALAPPDATA% 等）
    - 2.5: 实现 utils/privilege.rs: 管理员权限检测与提权请求
    - 2.6: 实现 utils/hash.rs: SHA-256 / 文件指纹计算
    - 2.7: 实现 config 模块: TOML 配置文件读写、默认配置生成

- [x] Task 3: Rust 后端 - 扫描引擎框架
    - 3.1: 实现 scanner/mod.rs: 扫描调度器，统一扫描接口 ScanResult/ScanItem 定义
    - 3.2: 实现 scanner/system_junk.rs: 8类系统垃圾扫描（M02-01~M02-08）
    - 3.3: 实现 scanner/app_cache.rs: 浏览器/开发工具/聊天应用/游戏平台/设计工具缓存扫描（M03-01~M03-06）
    - 3.4: 实现 scanner/big_file.rs: 大文件扫描、文件分类、孤立文件检测（M04-01~M04-05）
    - 3.5: 实现 scanner/duplicate.rs: 三种扫描策略（快速/标准/精确）、重复分组、智能保留推荐（M05-01~M05-04）
    - 3.6: 实现 scanner/privacy.rs: 浏览器/系统/应用隐私扫描、隐私评分计算（M07-01~M07-04）
    - 3.7: 实现 scanner/startup.rs: 注册表/启动文件夹/任务计划/服务扫描、数字签名验证（M08-01~M08-02）

- [x] Task 4: Rust 后端 - 清理执行器与备份回滚
    - 4.1: 实现 cleaner/mod.rs: 清理执行器，支持进度回调、取消操作、错误处理
    - 4.2: 实现清理前自动备份逻辑: 将待删文件压缩到 backup/{timestamp}.zip
    - 4.3: 实现清理日志记录: 写入 cleanup_logs 表
    - 4.4: 实现回滚恢复: 从备份 ZIP 中提取文件恢复到原路径或自定义路径
    - 4.5: 实现备份管理: 备份列表查询、过期清理、导出

- [x] Task 5: Rust 后端 - 清理影响评估与规则引擎
    - 5.1: 实现影响评估模块: 进程文件占用检测（遍历系统句柄）、风险等级判定、影响描述生成
    - 5.2: 实现 rules/mod.rs: 规则引擎核心，条件解析（路径/大小/年龄/类型）、动作执行（删除/移动/压缩/提醒）
    - 5.3: 实现 rules/templates.rs: 内置规则模板库
    - 5.4: 实现 rules/engine.rs: 规则 Dry Run、规则优先级排序、规则冲突检测

- [x] Task 6: Rust 后端 - 实时监控与系统托盘
    - 6.1: 实现 monitor/watcher.rs: 基于 ReadDirectoryChangesW 的关键目录文件变更监控
    - 6.2: 实现 monitor/tracker.rs: 大文件写入源追踪（进程名/PID/文件路径/写入速率）
    - 6.3: 实现系统托盘: 托盘图标、右键菜单、C盘剩余空间百分比显示
    - 6.4: 实现通知中心: 空间不足/大文件写入/异常增长/清理完成通知
    - 6.5: 实现定时清理: 与 Windows 任务计划程序集成，定时触发扫描清理

- [x] Task 7: Rust 后端 - IPC 命令注册
    - 7.1: 实现 commands/scan.rs: start_scan, cancel_scan, get_scan_progress, get_scan_result 等命令
    - 7.2: 实现 commands/clean.rs: start_clean, cancel_clean, get_clean_progress, get_clean_report 等命令
    - 7.3: 实现 commands/monitor.rs: start_monitor, stop_monitor, get_monitor_status, get_write_events 等命令
    - 7.4: 实现 commands/backup.rs: list_backups, restore_backup, delete_backup, export_backup 等命令
    - 7.5: 实现 commands/rules.rs: create_rule, update_rule, delete_rule, test_rule, list_templates 等命令
    - 7.6: 实现 commands/schedule.rs: create_schedule, update_schedule, delete_schedule, list_schedules 等命令
    - 7.7: 在 main.rs 中注册所有 IPC 命令与事件

- [x] Task 8: 前端基础设施 - 布局与主题（遵循 DESIGN.md 规范）
    - 8.1: 实现 components/layout/TitleBar.tsx: 自定义标题栏（拖拽区 + 最小化/最大化/关闭按钮），bg-surface + border-bottom
    - 8.2: 实现 components/layout/Sidebar.tsx: 可折叠侧边导航，IconPark outline 图标 + 文字，激活态 accent-brand-subtle 背景，路由联动
    - 8.3: 实现 components/layout/StatusBar.tsx: C盘空间进度条（6px高度、accent-brand填充）+ 剩余空间文字 + 状态信息
    - 8.4: 实现 App.tsx: 整体布局组装、路由配置（React Router），响应式断点（compact/default/wide）
    - 8.5: 实现主题系统: 浅色/深色模式切换、CSS 变量按 DESIGN.md Section 2 色板定义、TailwindCSS dark 模式
    - 8.6: 实现 stores/configStore.ts: 用户偏好持久化（主题、侧边栏状态、清理偏好等）

- [x] Task 9: 前端通用组件库（遵循 DESIGN.md 组件样式规范）
    - 9.1: 实现 components/common/ScanProgress.tsx: 扫描进度条（6px accent-brand）+ 当前路径（mono 层级）+ 文件数 + 预估时间
    - 9.2: 实现 components/common/CleanConfirm.tsx: 清理确认弹窗（Modal: bg-surface-elevated, radius-12px, shadow），分类勾选，预估释放空间汇总（display 层级数字）
    - 9.3: 实现 components/common/CleanReport.tsx: 清理报告卡片（bg-surface, border, radius-8px）
    - 9.4: 实现 components/common/FileList.tsx: 虚拟滚动文件列表（@tanstack/react-virtual），行高36px
    - 9.5: 实现 components/common/RiskBadge.tsx: 安全等级徽章（status-safe/warn/danger-subtle 背景 + 对应文字色）
    - 9.6: 实现 components/common/StatsCard.tsx: 统计数据卡片（bg-surface, 1px border-default, radius-8px, padding-16px）
    - 9.7: 实现 components/common/EmptyState.tsx: 空状态占位组件（IconPark 64px outline 图标 + text-tertiary 提示文字）
    - 9.8: 实现 components/common/Button.tsx: primary/secondary/ghost/danger 四变体按钮，按 DESIGN.md Section 4 样式
    - 9.9: 实现 components/common/Badge.tsx: 语义标签组件（safe/warn/danger/info 四色），按 DESIGN.md Section 4 样式
    - 9.10: 实现 hooks/useScan.ts: 扫描状态管理 Hook（调用 IPC、轮询进度）
    - 9.11: 实现 hooks/useClean.ts: 清理状态管理 Hook

- [x] Task 10: 前端模块 - M01 一键智能清理
    - 10.1: 实现 SmartClean/index.tsx: 页面主体，启动自动快速扫描
    - 10.2: 实现扫描结果分类展示: 绿/黄/红三级分类卡片
    - 10.3: 实现分类展开查看具体文件列表
    - 10.4: 实现一键清理按钮: 默认仅勾选绿色，黄色/红色需手动勾选
    - 10.5: 实现清理汇总卡片与清理报告展示
    - 10.6: 实现清理中断功能

- [x] Task 11: 前端模块 - M02 系统垃圾清理
    - 11.1: 实现 SystemJunk/index.tsx: 8类系统垃圾扫描结果展示
    - 11.2: 实现各类垃圾项的独立卡片: 图标 + 名称 + 文件数 + 大小
    - 11.3: 实现回收站管理: 文件筛选（类型/日期/路径）、选择性清空、文件恢复
    - 11.4: 实现单类清理与批量清理操作

- [x] Task 12: 前端模块 - M03 应用缓存清理
    - 12.1: 实现 AppCache/index.tsx: 按应用分类 Tab 切换（浏览器/开发工具/聊天/游戏/设计）
    - 12.2: 实现浏览器缓存详情: 各浏览器独立卡片、配置文件切换、Cookie 白名单设置
    - 12.3: 实现开发工具缓存详情: 各工具缓存大小展示
    - 12.4: 实现聊天应用缓存详情: 按分类（图片/视频/文件/语音）展示大小
    - 12.5: 实现应用缓存趋势追踪: Recharts 折线图 + 异常增长预警标红

- [x] Task 13: 前端模块 - M04 大文件分析器
    - 13.1: 实现 BigFile/index.tsx: 大文件阈值配置、扫描触发
    - 13.2: 实现文件分类视图: 按类型分组卡片展示
    - 13.3: 实现文件列表: 排序/筛选/多条件组合
    - 13.4: 实现文件详情面板: 属性展示 + 快捷操作（打开/删除/复制路径）
    - 13.5: 实现孤立文件检测: 疑似可删除标记 + 判断依据说明

- [x] Task 14: 前端模块 - M05 重复文件检测
    - 14.1: 实现 DuplicateFile/index.tsx: 扫描策略选择（快速/标准/精确）
    - 14.2: 实现重复文件组展示: 折叠组、浪费空间显示
    - 14.3: 实现智能保留推荐: 保留策略选择 + 手动选择保留文件
    - 14.4: 实现排除规则配置: 系统目录排除、自定义排除

- [x] Task 15: 前端模块 - M06 存储热力图 [核心创新]
    - 15.1: 实现 StorageMap/Treemap.tsx: Squarified Treemap 算法渲染、颜色编码、悬停详情
    - 15.2: 实现热力图交互: 双击下钻、面包屑导航、返回上级
    - 15.3: 实现 StorageMap/SunburstChart.tsx: 顶级目录环形图、扇区下钻
    - 15.4: 实现 StorageMap/Timeline.tsx: 空间变化时间线、快照对比、重大变化事件标注
    - 15.5: 实现目录层级钻取: 左侧目录树 + 右侧文件列表联动
    - 15.6: 实现扫描报告导出: JSON/CSV/HTML 三种格式

- [x] Task 16: 前端模块 - M07 隐私痕迹清理
    - 16.1: 实现 PrivacyClean/index.tsx: 浏览器/系统/应用三个分区
    - 16.2: 实现浏览器隐私: 各浏览器清理项勾选、Cookie 白名单
    - 16.3: 实现系统隐私痕迹: 各类痕迹扫描结果展示
    - 16.4: 实现隐私评分: 0-100分仪表盘 + 三维雷达图 + 改善建议

- [x] Task 17: 前端模块 - M08 启动项管理
    - 17.1: 实现 StartupManager/index.tsx: 启动项列表展示
    - 17.2: 实现启动项详情: 名称/发布者/命令行/路径、安全评级徽章
    - 17.3: 实现启动项操作: 启用/禁用切换、延迟启动配置
    - 17.4: 实现启动耗时分析: Recharts 趋势图 + 启动项变更事件标注

- [x] Task 18: 前端模块 - M09 系统更新清理
    - 18.1: 实现 UpdateClean/index.tsx: 四类更新清理项展示
    - 18.2: 实现 Windows.old 检测与清理（管理员权限提示）
    - 18.3: 实现组件存储清理: 清理前后对比展示
    - 18.4: 实现驱动备份清理: 旧版本驱动列表

- [x] Task 19: 前端模块 - M10 智能空间预测 [核心创新]
    - 19.1: 实现 SpacePredict/index.tsx: 空间预测总览页面
    - 19.2: 实现空间消耗速率计算展示: 各类型文件消耗速率
    - 19.3: 实现趋势预测图表: Recharts 折线图 + 置信区间 + 关键节点标注
    - 19.4: 实现增长源分析: Top 5 增长目录 + 针对性清理建议
    - 19.5: 实现空间不足预警: 阈值配置 + 预警状态卡片

- [x] Task 20: 前端模块 - M11 清理影响评估 [显著创新]
    - 20.1: 实现 CleanImpact/index.tsx: 影响评估面板
    - 20.2: 实现清理风险评估: 每项风险等级标注 + 判定依据
    - 20.3: 实现影响预览: 影响说明列表 + 持续时间/严重程度标签
    - 20.4: 实现关联应用检测: 占用进程信息 + 一键关闭关联应用
    - 20.5: 实现清理建议优化: 自动取消高风险项 + 替代方案推荐

- [x] Task 21: 前端模块 - M12 定时清理计划
    - 21.1: 实现 CleanSchedule/index.tsx: 计划列表页面
    - 21.2: 实现计划创建: 频率选择 + 模块选择 + 条件设置
    - 21.3: 实现计划管理: 编辑/删除/暂停/恢复
    - 21.4: 实现执行历史: 历史记录列表 + 清理报告查看

- [x] Task 22: 前端模块 - M13 清理回滚中心 [显著创新]
    - 22.1: 实现 RollbackCenter/index.tsx: 备份列表 + 日志列表双 Tab
    - 22.2: 实现清理日志: 按日期/模块/空间筛选、文件级详情展开
    - 22.3: 实现回滚恢复: 从备份选择文件、恢复到原路径/自定义路径、冲突处理
    - 22.4: 实现备份管理: 备份大小展示、过期清理、导出到外部

- [x] Task 23: 前端模块 - M14 存储规则引擎 [显著创新]
    - 23.1: 实现 RuleEngine/index.tsx: 规则列表页面
    - 23.2: 实现规则创建: 条件组合编辑器 + 动作选择 + 优先级设置
    - 23.3: 实现规则模板库: 模板卡片展示 + 一键应用
    - 23.4: 实现规则测试: Dry Run 结果展示 + 匹配文件列表预览
    - 23.5: 实现规则导入/导出

- [x] Task 24: 前端模块 - M15 实时磁盘监控 [核心创新]
    - 24.1: 实现 DiskMonitor/index.tsx: 监控总览页面
    - 24.2: 实现实时空间变化: C盘空间变化曲线（Recharts 实时更新）
    - 24.3: 实现写入源追踪: 写入活动时间线、进程详情卡片
    - 24.4: 实现通知中心: 通知列表 + 标记已读/一键清除
    - 24.5: 实现监控开关: 启动/暂停监控

- [x] Task 25: 前端模块 - M16 新手指南
    - 25.1: 实现 Onboarding/index.tsx: 全屏引导容器，步骤指示器（圆点 + 连线），遮罩层（L3 Overlay）
    - 25.2: 实现欢迎页: ClearC 品牌标识 + Slogan + "开始使用"/"跳过引导" 按钮
    - 25.3: 实现核心功能介绍（3步走）: 智能清理 / 空间分析 / 实时监控，每步含标题 + 描述 + 示意区域 + 导航按钮
    - 25.4: 实现安全承诺页: 白名单保护/清理前备份/回滚恢复说明，"清理前自动备份"勾选项
    - 25.5: 实现初始配置: 主题选择 + 清理偏好选择（保守/标准/深度）
    - 25.6: 实现 Rust 端首次启动检测 IPC 命令: check_initialized, set_initialized
    - 25.7: 完成引导后创建 .initialized 标记文件，跳转到主界面

- [x] Task 26: 前端模块 - M17 帮助中心
    - 26.1: 实现 HelpCenter/index.tsx: 帮助中心主页，功能说明/FAQ/排查/快捷操作分区
    - 26.2: 实现功能说明: 按模块分类的图文教程列表，图标使用 icon-park:help 各模块对应图标
    - 26.3: 实现 FAQ: 分类折叠面板 + 关键词搜索（前端过滤，离线数据）
    - 26.4: 实现问题排查: 步骤式排查指南（清理失败/扫描无结果/权限不足/托盘图标不显示）
    - 26.5: 实现快捷操作: 重新触发新手指南、重置设置、打开日志目录、版本信息、导出诊断信息
    - 26.6: 实现关于页面: 版本号、开源许可、IconPark 声明
    - 26.7: 实现各模块页面右上角帮助图标，点击跳转到对应功能说明

- [x] Task 27: 系统托盘集成与窗口管理
    - 27.1: 配置 Tauri 系统托盘: 图标、右键菜单项定义
    - 27.2: 实现关闭窗口时最小化到托盘而非退出
    - 27.3: 实现托盘菜单与前端状态同步
    - 27.4: 实现托盘图标动态更新（C盘剩余空间百分比文字）

- [x] Task 28: 安全白名单与权限管理
    - 28.1: 实现系统关键目录保护白名单（硬编码不可清理目录）
    - 28.2: 实现扫描时自动跳过白名单目录
    - 28.3: 实现管理员权限操作提示（UAC 提权）
    - 28.4: 在清理前验证目标路径不在白名单内

- [x] Task 29: 端到端联调与性能优化
    - 29.1: 前后端 IPC 全链路联调: 扫描 -> 确认 -> 清理 -> 报告
    - 29.2: 扫描性能优化: 并行扫描、目录跳过策略、扫描缓存
    - 29.3: 热力图渲染优化: 大数据量 Treemap 虚拟化渲染
    - 29.4: 内存优化: 流式处理大目录、及时释放扫描结果
    - 29.5: 打包体积优化: Rust strip、前端 tree-shaking、IconPark 按需引入
