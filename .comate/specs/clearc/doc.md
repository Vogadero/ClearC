# ClearC - Windows C盘深度清理工具 需求报告

## 一、项目概述

### 1.1 项目名称
**ClearC** - 基于 Tauri 框架的 Windows C盘智能清理工具

### 1.2 技术栈
- **前端**: React + TypeScript + Vite
- **后端**: Rust (Tauri Core)
- **图标库**: ByteDance IconPark (@icon-park/react)
- **样式方案**: TailwindCSS
- **目标平台**: Windows 10/11

### 1.3 项目定位
一款面向普通用户与高级用户的 C盘清理工具，在保证安全性的前提下，提供从基础清理到深度优化的全链路磁盘管理方案。区别于市面上已有的清理工具（CCleaner、360、Dism++等），ClearC 强调**透明可控、智能推荐、可视化呈现**三大核心理念。

---

## 二、功能模块详细设计

### 2.1 模块总览

| 模块编号 | 模块名称 | 优先级 | 创新标记 |
|---------|---------|--------|---------|
| M01 | 一键智能清理 | P0 | - |
| M02 | 系统垃圾清理 | P0 | - |
| M03 | 应用缓存清理 | P0 | * |
| M04 | 大文件分析器 | P0 | * |
| M05 | 重复文件检测 | P1 | - |
| M06 | 存储热力图 | P1 | *** |
| M07 | 隐私痕迹清理 | P0 | - |
| M08 | 启动项管理 | P1 | - |
| M09 | 系统更新清理 | P1 | - |
| M10 | 智能空间预测 | P2 | *** |
| M11 | 清理影响评估 | P1 | ** |
| M12 | 定时清理计划 | P2 | - |
| M13 | 清理回滚中心 | P1 | ** |
| M14 | 存储规则引擎 | P2 | ** |
| M15 | 实时磁盘监控 | P2 | *** |
| M16 | 新手指南 | P0 | - |
| M17 | 帮助中心 | P1 | - |

> 创新标记: - 常规功能, * 微创新, ** 显著创新, *** 核心创新

---

### 2.2 M01 - 一键智能清理

**功能描述**: 提供一键式清理入口，基于内置规则引擎自动扫描并推荐可清理项目，用户一键确认即可完成清理。

**详细功能点**:

- M01-01: 启动时自动执行快速扫描（不深入系统目录，扫描时间控制在5秒内）
- M01-02: 扫描结果按"安全等级"分类展示:
  - 绿色: 可安全清理（如临时文件、缩略图缓存）
  - 黄色: 建议清理但需确认（如浏览器缓存、下载历史）
  - 红色: 谨慎操作（如注册表条目、驱动备份）
- M01-03: 显示每个分类的可释放空间大小及文件数量
- M01-04: 支持展开查看每个分类下的具体文件列表
- M01-05: 一键清理按钮仅默认勾选"绿色"项目，黄色/红色需用户手动勾选
- M01-06: 清理前显示预估释放总空间的汇总卡片
- M01-07: 清理完成后展示清理报告（释放空间、清理文件数、耗时）
- M01-08: 支持清理中断（用户可随时取消进行中的清理操作）

**图标映射**:
- 主入口: `icon-park:clean` (抹布/清洁)
- 安全等级-绿: `icon-park:check-one` 
- 安全等级-黄: `icon-park:caution`
- 安全等级-红: `icon-park:close-warn`

---

### 2.3 M02 - 系统垃圾清理

**功能描述**: 扫描并清理 Windows 系统产生的各类临时文件与无用数据。

**详细功能点**:

- M02-01: **Windows 临时文件**
  - 扫描 `%TEMP%` 环境变量指向的用户临时目录
  - 扫描 `C:\Windows\Temp` 系统临时目录
  - 跳过当前被进程锁定的文件（记录跳过文件数）
  - 显示每个临时目录的文件数与占用空间

- M02-02: **Windows Update 缓存**
  - 扫描 `C:\Windows\SoftwareDistribution\Download`
  - 扫描 `C:\Windows\SoftwareDistribution\DataStore` 中的旧更新数据
  - 检测已安装更新的残留安装包
  - 显示更新缓存占用空间的增长趋势（对比上一次扫描）

- M02-03: **系统日志文件**
  - 扫描 `C:\Windows\Logs` 目录
  - 扫描 `C:\Windows\System32\winevt\Logs` 事件日志
  - 支持按日志大小和日期排序
  - 保留最近7天日志，默认仅清理更早的日志

- M02-04: **缩略图缓存**
  - 扫描 `%LOCALAPPDATA%\Microsoft\Windows\Explorer\thumbcache_*`
  - 显示缓存文件数量与总大小
  - 清理后自动触发缩略图重建提示

- M02-05: **回收站管理**
  - 显示回收站中文件的总大小与文件数
  - 支持按文件类型、删除日期、原路径筛选
  - 支持选择性清空（勾选特定文件永久删除）
  - 支持恢复误删文件到原路径

- M02-06: **Windows 错误报告**
  - 扫描 `%LOCALAPPDATA%\Microsoft\Windows\WER`
  - 扫描 `C:\ProgramData\Microsoft\Windows\WER`
  - 显示错误报告数量与占用空间

- M02-07: **字体缓存**
  - 扫描 `C:\Windows\ServiceProfiles\LocalService\AppData\Local\FontCache`
  - 显示缓存文件大小

- M02-08: **传递优化文件**
  - 扫描 `C:\Windows\SoftwareDistribution\DeliveryOptimization`
  - 显示传递优化缓存大小

**图标映射**:
- 模块图标: `icon-park:delete`
- 临时文件: `icon-park:file-caching`
- 更新缓存: `icon-park:download`
- 日志文件: `icon-park:log`
- 缩略图: `icon-park:picture-one`
- 回收站: `icon-park:delete-four`
- 错误报告: `icon-park:report`
- 字体缓存: `icon-park:text`
- 传递优化: `icon-park:send`

---

### 2.4 M03 - 应用缓存清理 [微创新]

**功能描述**: 扫描常用应用程序产生的缓存数据，支持按应用维度管理和清理。

**详细功能点**:

- M03-01: **浏览器缓存**
  - 支持: Chrome, Edge, Firefox, Opera, Brave, Vivaldi
  - 清理项: HTTP缓存、Cookie、浏览历史、下载记录、表单数据、密码（需二次确认）
  - 每个浏览器独立展示，显示配置文件数量与各配置文件占用空间
  - 支持保留指定站点的Cookie（白名单机制）

- M03-02: **开发工具缓存** [微创新: 开发者友好]
  - npm 缓存: `%APPDATA%\npm-cache`
  - yarn 缓存: `%LOCALAPPDATA%\Yarn\Cache`
  - pnpm 缓存: `%LOCALAPPDATA%\pnpm-cache`、`%LOCALAPPDATA%\pnpm-store`
  - pip 缓存: `%LOCALAPPDATA%\pip\Cache`
  - Maven 缓存: `~\.m2\repository`
  - Gradle 缓存: `~\.gradle\caches`
  - Cargo 缓存: `~\.cargo\registry`
  - Docker 镜像层缓存（如已安装Docker Desktop）
  - 显示每个工具缓存的包数量与总大小

- M03-03: **聊天/社交应用缓存**
  - 微信: 文件缓存、图片缓存、视频缓存、聊天记录备份
  - QQ: 同上
  - 钉钉: 缓存文件
  - 飞书: 缓存文件
  - Telegram Desktop: 缓存文件
  - 每个应用展示缓存分类（图片/视频/文件/语音）及各分类大小

- M03-04: **游戏平台缓存**
  - Steam: 下载缓存、截图、游戏日志
  - Epic Games: 下载缓存
  - Xbox Game Pass: 下载缓存
  - 显示各平台缓存大小

- M03-05: **设计工具缓存**
  - Figma Desktop 缓存
  - Adobe Creative Cloud 缓存
  - 显示缓存大小

- M03-06: **应用缓存趋势追踪** [微创新]
  - 记录每次扫描时各应用的缓存大小
  - 绘制应用缓存增长曲线图（折线图）
  - 对缓存增长异常的应用标红预警（如7天内缓存增长超过2GB）

**图标映射**:
- 模块图标: `icon-park:application`
- 浏览器: `icon-park:chrome`
- 开发工具: `icon-park:code`
- 聊天应用: `icon-park:communication`
- 游戏平台: `icon-park:game`
- 设计工具: `icon-park:design`
- 趋势图: `icon-park:trend`

---

### 2.5 M04 - 大文件分析器 [微创新]

**功能描述**: 扫描C盘中的大文件，提供多维度分析和可视化呈现。

**详细功能点**:

- M04-01: **大文件扫描**
  - 可配置大文件阈值（默认100MB，可调范围10MB-10GB）
  - 扫描C盘所有可访问目录
  - 跳过System Volume Information等系统保护目录
  - 显示扫描进度（已扫描目录数/文件数/耗时）

- M04-02: **文件分类视图**
  - 按文件类型分类: 视频、音频、图片、文档、压缩包、安装包、数据库、其他
  - 每个分类显示文件数与总大小
  - 支持展开查看分类下的具体文件列表

- M04-03: **文件排序与筛选**
  - 排序: 按大小降序、按修改时间、按访问时间、按创建时间
  - 筛选: 按文件类型、按大小范围、按时间范围、按目录
  - 支持多条件组合筛选

- M04-04: **文件详情面板**
  - 文件名、路径、大小、类型
  - 创建时间、修改时间、最后访问时间
  - 文件属性（只读/隐藏/系统）
  - 快捷操作: 打开文件、打开所在目录、复制路径、删除

- M04-05: **孤立文件检测** [微创新]
  - 检测已卸载程序遗留的文件和目录
  - 检测安装包/下载目录中长期未访问的文件（超过90天）
  - 检测临时解压目录残留
  - 标记"疑似可删除"文件并说明判断依据

**图标映射**:
- 模块图标: `icon-park:file-search`
- 视频: `icon-park:video`
- 音频: `icon-park:music`
- 图片: `icon-park:picture`
- 文档: `icon-park:file-text`
- 压缩包: `icon-park:file-zip`
- 安装包: `icon-park:install`
- 孤立文件: `icon-park:file-failed`

---

### 2.6 M05 - 重复文件检测

**功能描述**: 基于 hash 算法检测C盘中的重复文件，帮助用户回收重复占用的空间。

**详细功能点**:

- M05-01: **扫描策略**
  - 快速模式: 仅比较文件大小 + 文件名（速度快，可能有误报）
  - 标准模式: 比较文件大小 + 前1KB + 后1KB hash（平衡速度与准确性）
  - 精确模式: 全文件 SHA-256 hash（速度慢，零误报）

- M05-02: **重复文件组展示**
  - 以"重复组"为单位展示，每组包含2个及以上相同文件
  - 每组显示: 文件名、重复数量、每组浪费空间（(数量-1) * 单文件大小）
  - 支持展开查看每组下的所有文件路径

- M05-03: **智能选择保留文件** [微创新]
  - 自动推荐保留策略:
    - 保留路径最浅的（靠近根目录）
    - 保留最近修改的
    - 保留正在被程序引用的
  - 用户可手动选择保留哪个，其余标记删除
  - 支持一键"保留最早的，删除其余"

- M05-04: **排除规则**
  - 排除系统目录（Windows、Program Files等）
  - 排除指定后缀（.dll、.sys等系统文件）
  - 用户自定义排除目录

**图标映射**:
- 模块图标: `icon-park:copy`
- 快速模式: `icon-park:flash`
- 精确模式: `icon-park:aiming`
- 保留策略: `icon-park:protect`

---

### 2.7 M06 - 存储热力图 [核心创新]

**功能描述**: 以热力图形式可视化C盘的空间占用情况，让用户直观看到"空间都去哪了"。

**详细功能点**:

- M06-01: **Treemap 热力图**
  - 基于 Squarified Treemap 算法绘制
  - 每个矩形代表一个目录/文件，面积正比于占用空间
  - 颜色编码: 按文件类型着色（视频=蓝色、图片=绿色、文档=橙色等）
  - 支持鼠标悬停显示详细信息（路径、大小、占比）
  - 支持双击进入子目录，面包屑导航返回上级

- M06-02: **环形图 - 顶级目录占比**
  - 展示C盘顶级目录的空间占比
  - 支持: Users, Windows, Program Files, Program Files (x86), ProgramData, 其他
  - 点击扇区可下钻到子目录

- M06-03: **空间变化时间线** [核心创新]
  - 记录每次扫描的快照数据
  - 绘制空间占用的变化趋势图
  - 标注重大变化事件（如: "4月20日 Chrome缓存增长1.2GB"）
  - 对比任意两次快照的差异（新增/删除/修改的文件）

- M06-04: **目录层级钻取**
  - 支持从C盘根目录逐级下钻到任意深度的子目录
  - 左侧目录树同步高亮当前位置
  - 右侧显示当前目录的详细文件列表

- M06-05: **导出扫描报告**
  - 导出为 JSON 格式（结构化数据）
  - 导出为 CSV 格式（文件列表）
  - 导出为 HTML 格式（可视化报告，可在浏览器中查看热力图）

**图标映射**:
- 模块图标: `icon-park:chart-pie`
- 热力图: `icon-park:chart-bar`
- 环形图: `icon-park:pie`
- 时间线: `icon-park:time`
- 导出: `icon-park:export`

---

### 2.8 M07 - 隐私痕迹清理

**功能描述**: 清理系统中可能泄露用户隐私的数据痕迹。

**详细功能点**:

- M07-01: **浏览器隐私**
  - 清理浏览历史
  - 清理 Cookie（支持白名单保留指定站点）
  - 清理表单自动填充数据
  - 清理已保存的密码（需二次确认+密码验证）
  - 清理下载历史
  - 清理 LocalStorage / SessionStorage / IndexedDB

- M07-02: **系统隐私痕迹**
  - 清理最近打开文件记录 (`%APPDATA%\Microsoft\Windows\Recent`)
  - 清理运行历史 (`HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\RunMRU`)
  - 清理搜索历史
  - 清理剪贴板历史
  - 清理跳转列表 (Jump List)

- M07-03: **应用隐私痕迹**
  - 清理 Office 最近文档记录
  - 清理媒体播放器播放历史
  - 清理资源管理器地址栏历史

- M07-04: **隐私评分** [微创新]
  - 基于遗留隐私痕迹数量与敏感程度计算隐私评分（0-100）
  - 评分维度: 浏览器痕迹、系统痕迹、应用痕迹
  - 提供改善建议

**图标映射**:
- 模块图标: `icon-park:lock`
- 浏览器隐私: `icon-park:shield`
- 系统隐私: `icon-park:computer`
- 应用隐私: `icon-park:application-two`
- 隐私评分: `icon-park:score`

---

### 2.9 M08 - 启动项管理

**功能描述**: 管理系统启动时自动运行的程序与服务，优化开机速度。

**详细功能点**:

- M08-01: **启动项扫描**
  - 扫描注册表启动项: `HKCU\...\Run`, `HKLM\...\Run`
  - 扫描启动文件夹: `%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup`
  - 扫描任务计划程序中的启动任务
  - 扫描 Windows 服务（自动启动类型）

- M08-02: **启动项详情**
  - 名称、发布者、命令行、注册表路径/文件路径
  - 启动影响评估: 低/中/高（基于启动耗时数据）
  - 安全评级: 安全/未知/风险（基于数字签名验证）

- M08-03: **启动项操作**
  - 启用/禁用启动项（不删除，可随时恢复）
  - 延迟启动（系统启动后30秒/60秒/自定义延迟再启动）
  - 打开所在位置
  - 在线搜索启动项信息

- M08-04: **启动耗时分析** [微创新]
  - 记录每次开机到桌面可用的时间
  - 绘制启动耗时趋势图
  - 标注启动项变更事件与耗时变化的关系

**图标映射**:
- 模块图标: `icon-park:startup`
- 启用: `icon-park:play`
- 禁用: `icon-park:pause`
- 延迟: `icon-park:timer`
- 安全: `icon-park:verify`
- 风险: `icon-park:caution`

---

### 2.10 M09 - 系统更新清理

**功能描述**: 清理 Windows 系统更新产生的冗余文件。

**详细功能点**:

- M09-01: **旧版本 Windows 备份**
  - 检测 `C:\Windows.old` 目录
  - 显示 Windows.old 大小与版本信息
  - 清理需管理员权限确认

- M09-02: **更新安装缓存**
  - 扫描 `C:\Windows\SoftwareDistribution\Download`
  - 扫描 `C:\Windows\Installer` 中的冗余 MSP/MSI 补丁
  - 显示可清理的更新缓存大小

- M09-03: **组件存储清理**
  - 扫描 WinSxS 组件存储的实际大小与共享大小
  - 执行组件存储清理（等效于 `Dism /Online /Cleanup-Image /StartComponentCleanup`）
  - 显示清理前后对比

- M09-04: **驱动备份清理**
  - 扫描 `C:\Windows\System32\DriverStore\FileRepository`
  - 检测旧版本驱动（保留当前版本，清理旧版本）
  - 显示可回收的驱动备份空间

**图标映射**:
- 模块图标: `icon-park:update-rotation`
- 旧版本: `icon-park:history`
- 组件存储: `icon-park:database`
- 驱动: `icon-park:hard-disk`

---

### 2.11 M10 - 智能空间预测 [核心创新]

**功能描述**: 基于历史扫描数据，预测C盘空间变化趋势，提前预警空间不足风险。

**详细功能点**:

- M10-01: **空间消耗速率计算**
  - 基于多次扫描快照，计算平均每日空间消耗速率
  - 区分不同类型文件的消耗速率（系统缓存、应用数据、用户文件）
  - 计算C盘剩余空间耗尽的预计时间

- M10-02: **趋势预测图表**
  - 线性回归预测未来7天/30天/90天的空间占用
  - 置信区间可视化（乐观/悲观预测）
  - 标注关键节点: "预计45天后C盘剩余不足10GB"

- M10-03: **增长源分析** [核心创新]
  - 自动识别空间增长最快的Top 5目录
  - 分析增长来源（哪个应用/系统组件在持续写入数据）
  - 针对增长源给出针对性清理建议

- M10-04: **空间不足预警**
  - 设置预警阈值（如剩余空间低于20GB/10GB/5GB）
  - 触发预警时系统托盘弹出通知
  - 预警时附带快速清理建议

**图标映射**:
- 模块图标: `icon-park:trend-two`
- 预测: `icon-park:data`
- 预警: `icon-park:alarm`
- 增长源: `icon-park:ranking`

---

### 2.12 M11 - 清理影响评估 [显著创新]

**功能描述**: 在用户执行清理前，分析并展示清理操作可能产生的影响，避免误删导致应用异常。

**详细功能点**:

- M11-01: **清理风险评估**
  - 对每个待清理项标注风险等级: 无风险/低风险/中风险/高风险
  - 风险判定依据:
    - 文件是否被当前运行进程引用
    - 清理后应用是否需要重新下载/重新生成
    - 清理是否影响用户个人数据
    - 清理是否需要重启才能生效

- M11-02: **影响预览面板**
  - 清理前展示影响说明列表:
    - "清理Chrome缓存后，网页加载可能暂时变慢"
    - "清理npm缓存后，下次npm install需要重新下载"
    - "清理微信缓存后，历史图片/视频需重新下载查看"
  - 每项影响标注影响的持续时间和严重程度

- M11-03: **关联应用检测** [显著创新]
  - 检测待清理文件被哪些应用依赖
  - 如: "该缓存目录被 Chrome (PID: 1234) 占用，建议关闭Chrome后清理"
  - 提供一键关闭关联应用的功能（需用户确认）

- M11-04: **清理建议优化**
  - 基于影响评估结果，自动取消高风险项的勾选
  - 对中风险项提供替代方案（如: "建议仅清理30天前的缓存"）
  - 生成个性化的清理方案

**图标映射**:
- 模块图标: `icon-park:analysis`
- 风险评估: `icon-park:shield`
- 影响预览: `icon-park:view-list`
- 关联检测: `icon-park:link`
- 优化建议: `icon-park:lightbulb`

---

### 2.13 M12 - 定时清理计划

**功能描述**: 支持设置定时自动清理任务，无需手动操作。

**详细功能点**:

- M12-01: **计划创建**
  - 支持频率: 每日/每周/每月/自定义Cron表达式
  - 选择清理模块（如仅清理系统垃圾+应用缓存）
  - 设置清理条件（如仅当可清理空间 > 500MB时才执行）

- M12-02: **计划执行**
  - 使用 Windows 任务计划程序注册定时任务
  - 静默执行模式（无UI弹窗，完成后托盘通知）
  - 执行失败自动重试（最多3次）
  - 记录每次执行的清理报告

- M12-03: **计划管理**
  - 查看/编辑/删除已有计划
  - 暂停/恢复计划
  - 查看执行历史

**图标映射**:
- 模块图标: `icon-park:time`
- 创建: `icon-park:add`
- 执行: `icon-park:play`
- 历史: `icon-park:history`

---

### 2.14 M13 - 清理回滚中心 [显著创新]

**功能描述**: 记录所有清理操作的详细日志，支持对已清理的文件进行回滚恢复。

**详细功能点**:

- M13-01: **清理前自动备份**
  - 清理前将待删除文件压缩备份到 `%APPDATA%\ClearC\backup\{timestamp}.zip`
  - 备份文件按日期组织，显示备份大小
  - 设置备份保留期限（默认30天，可配置）
  - 当备份总大小超过阈值时提示清理旧备份

- M13-02: **清理日志**
  - 记录每次清理操作的详细信息:
    - 清理时间、模块、项目
    - 每个被删除文件的原始路径和大小
    - 清理释放的总空间
  - 支持按日期/模块/空间大小筛选日志

- M13-03: **回滚恢复**
  - 从备份中选择需要恢复的文件
  - 支持恢复到原路径
  - 支持恢复到自定义路径
  - 如果原路径已存在同名文件，提示覆盖/重命名/跳过

- M13-04: **备份管理**
  - 查看所有备份列表及大小
  - 删除指定备份
  - 一键清理过期备份
  - 导出备份到外部存储

**图标映射**:
- 模块图标: `icon-park:undo`
- 备份: `icon-park:save`
- 日志: `icon-park:file-text`
- 恢复: `icon-park:refresh`
- 管理备份: `icon-park:folder`

---

### 2.15 M14 - 存储规则引擎 [显著创新]

**功能描述**: 允许用户自定义清理规则，实现个性化的自动化存储管理。

**详细功能点**:

- M14-01: **规则创建**
  - 规则条件（可组合）:
    - 文件路径匹配（支持通配符，如 `*.log`、`C:\Users\*\Downloads\*.tmp`）
    - 文件大小条件（大于/小于指定大小）
    - 文件年龄条件（超过N天未访问/未修改）
    - 文件类型条件（扩展名匹配）
  - 规则动作:
    - 删除
    - 移动到指定目录
    - 压缩归档
    - 标记提醒（不自动执行，仅提醒用户）
  - 规则优先级（多条规则冲突时按优先级执行）

- M14-02: **规则模板库**
  - 内置常用规则模板:
    - "清理下载目录中超过90天的安装包"
    - "压缩超过30天的日志文件"
    - "移动大视频文件到D盘"
  - 支持导入/导出规则配置

- M14-03: **规则测试**
  - 对规则执行干运行（Dry Run），仅展示匹配结果不实际执行
  - 显示匹配的文件数和总大小
  - 支持预览匹配文件列表

- M14-04: **规则市场** [创新]
  - 社区共享的规则模板
  - 用户可上传/下载规则模板
  - 规则评分与下载量排序
  - 注: 此功能需要后端支持，初期可离线内置精选规则

**图标映射**:
- 模块图标: `icon-park:setting-config`
- 规则: `icon-park:rule`
- 模板: `icon-park:template`
- 测试: `icon-park:test-tube`
- 市场: `icon-park:shop`

---

### 2.16 M15 - 实时磁盘监控 [核心创新]

**功能描述**: 实时监控C盘空间变化，当检测到异常写入时及时提醒用户。

**详细功能点**:

- M15-01: **实时空间变化监控**
  - 监控C盘可用空间的实时变化
  - 使用 Windows API `ReadDirectoryChangesW` 监控关键目录的文件变更
  - 当单次写入超过阈值（可配置，默认500MB）时弹出通知

- M15-02: **写入源追踪** [核心创新]
  - 当检测到大文件写入时，追踪写入进程:
    - 进程名称与PID
    - 写入的文件路径
    - 写入速率
  - 展示近期写入活动的时间线

- M15-03: **系统托盘驻留**
  - 最小化到系统托盘运行
  - 托盘图标显示C盘剩余空间百分比
  - 右键菜单: 快速清理、打开主界面、暂停监控、退出
  - 空间不足时托盘图标变色预警

- M15-04: **通知中心**
  - 应用内通知列表，记录所有监控告警
  - 通知类型: 空间不足、大文件写入、异常增长、清理完成
  - 支持标记已读/一键清除

**图标映射**:
- 模块图标: `icon-park:monitor`
- 追踪: `icon-park:target`
- 托盘: `icon-park:minimize`
- 通知: `icon-park:remind`

---

---

### 2.16 M16 - 新手指南

**功能描述**: 首次启动软件时展示引导流程，帮助用户快速了解核心功能与操作方式。

**详细功能点**:

- M16-01: **首次启动检测**
  - 检测 `%APPDATA%\ClearC\.initialized` 标记文件是否存在
  - 若不存在则自动进入新手指南流程
  - 用户可随时通过帮助中心重新触发新手指南

- M16-02: **欢迎页**
  - 展示 ClearC 品牌标识与 Slogan（"让C盘空间尽在掌握"）
  - 简短文字介绍: ClearC 能做什么（清理、分析、监控、优化）
  - "开始使用" 按钮 + "跳过引导" 文字链接

- M16-03: **核心功能介绍（3步走引导）**
  - 第1步 - 智能清理: 介绍一键清理功能，配图示意扫描与清理流程
  - 第2步 - 空间分析: 介绍热力图与大文件分析，配图示意可视化效果
  - 第3步 - 实时监控: 介绍后台监控与预警机制，配图示意托盘与通知
  - 每步包含: 标题 + 描述文字 + 示意图区域 + 上一步/下一步按钮
  - 步骤指示器（圆点 + 连线）显示当前进度

- M16-04: **安全承诺页**
  - 说明清理安全性: 白名单保护、清理前备份、支持回滚
  - 用户可勾选"清理前自动备份"选项（默认开启）
  - "我已了解" 确认按钮

- M16-05: **初始配置**
  - 选择主题: 浅色/深色/跟随系统
  - 选择清理偏好: 保守模式（仅清理安全项）/ 标准模式（推荐）/ 深度模式（需谨慎确认）
  - 完成配置后创建 `.initialized` 标记文件

**图标映射**:
- 模块图标: `icon-park:guide`
- 欢迎: `icon-park:welcome`
- 下一步: `icon-park:right`
- 上一步: `icon-park:left`
- 安全: `icon-park:shield`
- 配置: `icon-park:setting`

---

### 2.17 M17 - 帮助中心

**功能描述**: 提供应用内帮助文档、功能说明与问题排查指南。

**详细功能点**:

- M17-01: **功能说明**
  - 每个模块的操作指南（与各模块页面的帮助图标联动）
  - 按模块分类的图文教程
  - 术语解释（如"组件存储"、"传递优化"等系统术语）

- M17-02: **常见问题 (FAQ)**
  - 按分类组织: 清理安全、空间分析、监控预警、权限相关
  - 支持关键词搜索
  - 内置 FAQ 数据（不依赖网络）

- M17-03: **问题排查**
  - "清理失败"排查步骤
  - "扫描无结果"排查步骤
  - "权限不足"解决方案
  - "托盘图标不显示"解决方案

- M17-04: **快捷操作**
  - 重新触发新手指南
  - 重置所有设置到默认值
  - 打开日志目录
  - 查看版本信息与更新检查
  - 导出诊断信息（系统信息 + 应用配置 + 最近日志）

- M17-05: **关于页面**
  - 应用版本号、构建时间
  - 开源许可声明
  - IconPark 图标库声明
  - 项目仓库链接

**图标映射**:
- 模块图标: `icon-park:help`
- FAQ: `icon-park:question`
- 排查: `icon-park:bug`
- 快捷操作: `icon-park:shortcut`
- 关于: `icon-park:info`

---

## 三、UI/UX 设计规范（DESIGN.md 格式）

> 以下遵循 awesome-design-md 的 9 章节 DESIGN.md 规范，定义 ClearC 的视觉设计系统。

### 3.1 Section 1: Visual Theme & Atmosphere

**设计哲学**: 清冷精密、克制内敛。作为一款系统工具，ClearC 追求"信息密度高但视觉噪音低"的界面风格。界面应传递专业可信感，避免花哨装饰，让数据与操作成为视觉焦点。

**情绪关键词**: 精密 / 冷静 / 透明 / 高效

**视觉密度**: 中高密度。核心数据（空间大小、文件数、进度）优先展示，辅助信息可折叠。行间距紧凑但不拥挤。

**设计风格参照**: Linear（暗色精密感）+ Windows 11 Fluent Design（圆角与层次感）

### 3.2 Section 2: Color Palette & Roles

#### 浅色模式

| 语义名 | 色值 | 用途 |
|--------|------|------|
| `bg-canvas` | `#F7F8FA` | 页面背景 |
| `bg-surface` | `#FFFFFF` | 卡片/面板背景 |
| `bg-surface-elevated` | `#FFFFFF` | 弹窗/浮层背景 |
| `bg-inset` | `#F0F1F3` | 输入框/内嵌区域背景 |
| `border-default` | `#E5E6EB` | 默认边框 |
| `border-subtle` | `#F0F1F3` | 微弱分隔线 |
| `text-primary` | `#1D2129` | 主文字 |
| `text-secondary` | `#4E5969` | 辅助文字 |
| `text-tertiary` | `#86909C` | 占位/提示文字 |
| `accent-brand` | `#1677FF` | 品牌蓝/主操作色 |
| `accent-brand-hover` | `#4096FF` | 品牌蓝悬停 |
| `accent-brand-active` | `#0958D9` | 品牌蓝按下 |
| `accent-brand-subtle` | `#E8F3FF` | 品牌蓝浅底（选中态/高亮背景） |
| `status-safe` | `#00B42A` | 安全/成功 |
| `status-safe-subtle` | `#E8FFEA` | 安全浅底 |
| `status-warn` | `#FF7D00` | 警告 |
| `status-warn-subtle` | `#FFF7E8` | 警告浅底 |
| `status-danger` | `#F53F3F` | 危险/错误 |
| `status-danger-subtle` | `#FFECE8` | 危险浅底 |
| `status-info` | `#1677FF` | 信息提示 |
| `status-info-subtle` | `#E8F3FF` | 信息浅底 |

#### 深色模式

| 语义名 | 色值 | 用途 |
|--------|------|------|
| `bg-canvas` | `#17171A` | 页面背景 |
| `bg-surface` | `#232326` | 卡片/面板背景 |
| `bg-surface-elevated` | `#2C2C30` | 弹窗/浮层背景 |
| `bg-inset` | `#1A1A1D` | 输入框/内嵌区域背景 |
| `border-default` | `#3D3D40` | 默认边框 |
| `border-subtle` | `#2C2C30` | 微弱分隔线 |
| `text-primary` | `#F0F0F2` | 主文字 |
| `text-secondary` | `#A8A8AD` | 辅助文字 |
| `text-tertiary` | `#6B6B70` | 占位/提示文字 |
| `accent-brand` | `#3C8AFF` | 品牌蓝/主操作色 |
| `accent-brand-hover` | `#5A9AFF` | 品牌蓝悬停 |
| `accent-brand-active` | `#2A6FD6` | 品牌蓝按下 |
| `accent-brand-subtle` | `#1A2E4A` | 品牌蓝浅底 |
| `status-safe` | `#23C343` | 安全/成功 |
| `status-safe-subtle` | `#0E2A15` | 安全浅底 |
| `status-warn` | `#FF9A2E` | 警告 |
| `status-warn-subtle` | `#2A2010` | 警告浅底 |
| `status-danger` | `#F76560` | 危险/错误 |
| `status-danger-subtle` | `#2A1515` | 危险浅底 |
| `status-info` | `#3C8AFF` | 信息提示 |
| `status-info-subtle` | `#1A2E4A` | 信息浅底 |

### 3.3 Section 3: Typography Rules

**字体族**:

| 角色 | 字体栈 | 说明 |
|------|--------|------|
| 主字体 | `"Segoe UI Variable", "Segoe UI", "Microsoft YaHei UI", system-ui, sans-serif` | 西文 Segoe UI + 中文微软雅黑 |
| 等宽字体 | `"Cascadia Code", "Consolas", "Courier New", monospace` | 代码/路径/哈希值展示 |

**字体层级表**:

| 层级 | 大小 | 字重 | 行高 | 字间距 | 用途 |
|------|------|------|------|--------|------|
| `display` | 28px | 600 | 36px | -0.02em | 大数字展示（如"12.8 GB"） |
| `h1` | 20px | 600 | 28px | -0.01em | 模块标题 |
| `h2` | 16px | 600 | 24px | 0 | 卡片标题/区块标题 |
| `h3` | 14px | 600 | 22px | 0 | 子标题 |
| `body` | 14px | 400 | 22px | 0 | 正文 |
| `body-sm` | 13px | 400 | 20px | 0 | 辅助说明文字 |
| `caption` | 12px | 400 | 18px | 0 | 标签/备注 |
| `mono` | 13px | 400 | 20px | 0 | 路径/哈希/代码 |

**OpenType 特性**: 启用 `tnum`（等宽数字），确保数值对齐。

### 3.4 Section 4: Component Stylings

#### 按钮

| 变体 | 样式 | 悬停 | 按下 | 禁用 |
|------|------|------|------|------|
| `primary` | `bg: accent-brand, text: white, radius: 6px, h: 32px, px: 16px` | `bg: accent-brand-hover` | `bg: accent-brand-active` | `opacity: 0.4, cursor: not-allowed` |
| `secondary` | `bg: transparent, text: accent-brand, border: 1px solid accent-brand, radius: 6px` | `bg: accent-brand-subtle` | `bg: accent-brand-subtle, border-color: accent-brand-active` | `opacity: 0.4` |
| `ghost` | `bg: transparent, text: text-secondary, radius: 6px` | `bg: bg-inset, text: text-primary` | `bg: bg-inset` | `opacity: 0.4` |
| `danger` | `bg: status-danger, text: white, radius: 6px` | `bg: #CC3030` | `bg: #B02020` | `opacity: 0.4` |

#### 卡片

- 背景: `bg-surface`
- 边框: `1px solid border-default`
- 圆角: `8px`
- 内边距: `16px`
- 悬停: `border-color: accent-brand`（可交互卡片）
- 阴影: 无（依靠边框和背景区分层次）

#### 输入框

- 高度: `32px`
- 背景: `bg-inset`
- 边框: `1px solid border-default`
- 圆角: `6px`
- 聚焦: `border-color: accent-brand, box-shadow: 0 0 0 2px accent-brand-subtle`
- 占位符: `text-tertiary`

#### 导航项

- 默认: `bg: transparent, text: text-secondary, radius: 6px, h: 36px`
- 悬停: `bg: bg-inset, text: text-primary`
- 激活: `bg: accent-brand-subtle, text: accent-brand, font-weight: 600`
- 图标: 20px，与文字间距 10px

#### 进度条

- 高度: `6px`
- 轨道: `bg-inset, radius: 3px`
- 填充: `accent-brand, radius: 3px`
- 动画: `transition: width 300ms ease`
- 百分比文字: `caption` 层级，显示在进度条右侧

#### 标签/徽章

- 安全: `bg: status-safe-subtle, text: status-safe, radius: 4px, px: 6px, py: 2px`
- 警告: `bg: status-warn-subtle, text: status-warn`
- 危险: `bg: status-danger-subtle, text: status-danger`
- 信息: `bg: status-info-subtle, text: status-info`

#### 弹窗 (Modal)

- 遮罩: `bg-black/50`
- 容器: `bg-surface-elevated, radius: 12px, shadow: 0 8px 40px rgba(0,0,0,0.12)`
- 最大宽度: `480px`
- 标题: `h2` 层级
- 按钮区: 右对齐，主按钮在右

#### 工具提示 (Tooltip)

- 背景: `bg-surface-elevated`
- 边框: `1px solid border-default`
- 圆角: `6px`
- 内边距: `6px 10px`
- 文字: `caption` 层级
- 最大宽度: `280px`

### 3.5 Section 5: Layout Principles

**间距系统** (4px 基数):

| Token | 值 | 用途 |
|-------|-----|------|
| `space-1` | 4px | 图标与文字间距 |
| `space-2` | 8px | 紧凑元素间距 |
| `space-3` | 12px | 同组元素间距 |
| `space-4` | 16px | 卡片内边距、元素间默认间距 |
| `space-5` | 20px | 区块间距 |
| `space-6` | 24px | 大区块间距 |
| `space-8` | 32px | 模块间间距 |
| `space-10` | 40px | 页面级间距 |

**网格**: 无严格栅格，采用弹性布局 + 固定间距系统。

**侧边栏**:
- 展开宽度: `220px`
- 收起宽度: `56px`
- 图标居中（收起态），图标+文字左对齐（展开态）

**内容区**:
- 最大内容宽度: `960px`（居中）
- 卡片网格: 自适应，最小列宽 `280px`

**状态栏**:
- 高度: `36px`
- 内边距: `0 space-4`

### 3.6 Section 6: Depth & Elevation

**层次体系** (不使用阴影，依靠背景亮度递增区分):

| 层级 | 浅色模式背景 | 深色模式背景 | 用途 |
|------|-------------|-------------|------|
| L0 - Canvas | `#F7F8FA` | `#17171A` | 页面底色 |
| L1 - Surface | `#FFFFFF` | `#232326` | 卡片/面板 |
| L2 - Elevated | `#FFFFFF` | `#2C2C30` | 弹窗/浮层/Tooltip |
| L3 - Overlay | `rgba(0,0,0,0.5)` | `rgba(0,0,0,0.6)` | 遮罩层 |

**唯一例外**: Modal 弹窗使用 `0 8px 40px rgba(0,0,0,0.12)` 阴影以强调浮起感。

**边框即层次**: 卡片使用 `1px solid border-default` 边框而非阴影来定义边界，保持界面干净。

### 3.7 Section 7: Do's and Don'ts

**Do**:
- 使用 IconPark 线性风格图标，与文字搭配传达含义
- 数值数据使用等宽数字特性（`font-variant-numeric: tabular-nums`）
- 卡片间使用一致间距（`space-4`）
- 危险操作使用红色强调并要求二次确认
- 空状态提供引导性操作按钮
- 长列表使用虚拟滚动避免性能问题

**Don't**:
- 禁止使用 Emoji 作为功能图标或界面装饰
- 禁止在浅色模式使用纯黑（`#000000`）文字
- 禁止卡片使用大阴影（最大仅 Modal 允许阴影）
- 禁止在深色模式使用高饱和度纯色大块背景
- 禁止无文字说明的纯图标按钮（所有图标按钮必须有 Tooltip）
- 禁止自动删除文件而不经过用户确认
- 禁止在清理进度中隐藏取消按钮

### 3.8 Section 8: Responsive Behavior

ClearC 为桌面端原生应用，窗口尺寸范围: 最小 `800x600`，默认 `1100x700`。

| 断点 | 宽度 | 行为 |
|------|------|------|
| `compact` | < 900px | 侧边栏自动收起为图标模式 |
| `default` | 900-1200px | 侧边栏展开，内容区单列/双列自适应 |
| `wide` | > 1200px | 侧边栏展开，内容区可展示三列卡片 |

**窗口缩放**:
- 侧边栏: 用户可手动折叠/展开，compact 断点自动折叠
- 卡片网格: 自适应列数（CSS Grid `auto-fill, minmax(280px, 1fr)`）
- 热力图: 等比缩放，最小宽度 600px 以下切换为列表视图

### 3.9 Section 9: Agent Prompt Guide

**快速色彩参考**:
- 品牌蓝: `#1677FF` / 深色 `#3C8AFF`
- 安全绿: `#00B42A` / 深色 `#23C343`
- 警告橙: `#FF7D00` / 深色 `#FF9A2E`
- 危险红: `#F53F3F` / 深色 `#F76560`

**通用 Prompt 模板**:
```
使用 ClearC 设计系统构建 [组件名]:
- 浅色背景 bg-canvas(#F7F8FA)，卡片 bg-surface(#FFFFFF) 配 1px border-default(#E5E6EB) 边框
- 主操作使用 accent-brand(#1677FF) 填充按钮，文字白色
- 数值使用 display 层级(28px/600) + tabular-nums
- 状态标签使用对应 status-*-subtle 背景 + status-* 文字
- 图标使用 @icon-park/react 线性风格，16-20px
- 圆角 6-8px，间距遵循 4px 基数
- 深色模式切换对应深色色值
```

**布局结构**:

```
+------------------------------------------+
|  Title Bar (拖拽区 + 窗口控制)            |
+--------+---------------------------------+
|        |                                 |
|  Side  |         Main Content            |
|  Nav   |                                 |
|        |                                 |
|  (Icon |  [Header: 模块标题 + 描述]       |
|  Only  |  [Stats Cards: 统计卡片]         |
|   or   |  [Action Area: 操作区域]         |
|  Icon  |  [Result Area: 结果展示]         |
|  +Text)|                                 |
|        |                                 |
+--------+---------------------------------+
|  Status Bar (C盘空间进度条 + 状态信息)     |
+------------------------------------------+
```

- **侧边导航**: 可折叠，展开时显示图标+文字，收起时仅显示图标
- **内容区**: 卡片式布局，信息密度适中
- **状态栏**: 始终显示C盘空间使用情况

**交互规范**:

- **扫描操作**: 显示进度条+当前扫描路径+已扫描文件数+预估剩余时间
- **清理操作**: 清理前必须确认，清理中显示进度，清理后显示报告
- **删除操作**: 敏感删除需二次确认弹窗
- **导航切换**: 左侧导航切换时内容区平滑过渡

**图标使用规范**:

- **图标库**: 统一使用 `@icon-park/react`
- **图标尺寸**:
  - 导航图标: 20px
  - 功能图标: 16px
  - 状态图标: 14px
  - 空状态图标: 64px
- **图标风格**: 统一使用 `theme="outline"` 线性风格
- **图标颜色**: 跟随当前文字颜色或使用语义色
- **禁止使用 Emoji** 作为功能图标或界面元素

---

## 四、技术创新点总结

### 4.1 核心创新 (3项)

| 编号 | 创新点 | 模块 | 说明 |
|------|--------|------|------|
| C01 | 存储热力图 | M06 | Treemap可视化+时间线对比，让用户直观看到空间流向 |
| C02 | 智能空间预测 | M10 | 基于历史数据预测空间耗尽时间，主动预警 |
| C03 | 实时写入源追踪 | M15 | 追踪大文件写入进程，解决"空间莫名减少"的痛点 |

### 4.2 显著创新 (3项)

| 编号 | 创新点 | 模块 | 说明 |
|------|--------|------|------|
| S01 | 清理影响评估 | M11 | 清理前预知影响，避免误删导致应用异常 |
| S02 | 清理回滚中心 | M13 | 支持已清理文件的回滚恢复，消除清理顾虑 |
| S03 | 存储规则引擎 | M14 | 自定义清理规则，实现个性化自动化管理 |

### 4.3 微创新 (4项)

| 编号 | 创新点 | 模块 | 说明 |
|------|--------|------|------|
| M01 | 开发工具缓存清理 | M03 | 专门针对开发者场景，覆盖npm/pip/Maven等 |
| M02 | 应用缓存趋势追踪 | M03 | 追踪应用缓存增长趋势，异常增长预警 |
| M03 | 孤立文件检测 | M04 | 智能识别已卸载应用的残留文件 |
| M04 | 启动耗时分析 | M08 | 关联启动项变更与启动耗时变化 |

---

## 五、数据流与架构

### 5.1 整体架构

```
[React Frontend] <--Tauri IPC--> [Rust Backend]
     |                                  |
  UI渲染/交互                      文件系统操作
  图表/热力图                      注册表操作
  状态管理                         进程监控
  IconPark图标                     Windows API调用
                                   压缩/解压
                                   数据库(SQLite)
```

### 5.2 数据存储

- **扫描结果**: SQLite 数据库（`%APPDATA%\ClearC\clearc.db`）
  - scan_records 表: 扫描记录
  - file_entries 表: 文件条目
  - cleanup_logs 表: 清理日志
  - backup_records 表: 备份记录
  - rules 表: 用户自定义规则
  - scheduled_tasks 表: 定时任务
  - app_state 表: 应用状态（含首次启动标记、用户偏好等）

- **配置文件**: TOML 格式（`%APPDATA%\ClearC\config.toml`）
  - 用户偏好设置
  - 清理规则配置
  - 排除目录配置

- **备份文件**: ZIP 格式（`%APPDATA%\ClearC\backup\`）
  - 按时间戳命名的清理前备份

### 5.3 关键数据流

**一键清理流程**:
```
用户点击"一键清理" 
  -> Rust: 快速扫描各模块 
  -> 返回扫描结果到前端 
  -> 用户勾选确认 
  -> 前端发送清理请求 
  -> Rust: 创建备份 
  -> Rust: 执行清理 
  -> Rust: 记录日志 
  -> 返回清理报告到前端
```

**空间预测流程**:
```
用户打开空间预测页 
  -> Rust: 读取历史扫描记录 
  -> Rust: 计算消耗速率 
  -> Rust: 线性回归预测 
  -> 返回预测数据到前端 
  -> 前端: 渲染趋势图表
```

---

## 六、安全性设计

### 6.1 安全原则

- **永不自动删除**: 所有删除操作必须经过用户确认
- **白名单保护**: 系统关键目录默认加入保护白名单，不允许被扫描清理
- **备份优先**: 清理前自动备份，支持回滚
- **权限最小化**: 仅申请必要的文件系统权限，不申请网络权限（规则市场除外）
- **数字签名验证**: 启动项管理中验证数字签名，标注未签名项

### 6.2 保护白名单目录

```
C:\Windows\System32\config
C:\Windows\System32\drivers
C:\Windows\System32\GroupPolicy
C:\Windows\WinSxS (仅允许通过Dism清理)
C:\Windows\Boot
C:\Windows\EFI
```

---

## 七、性能要求

- 一键快速扫描: < 5秒
- 完整扫描: < 60秒（取决于文件数量）
- 清理操作: 显示进度，支持取消
- 热力图渲染: < 2秒（10万文件以内）
- 内存占用: 空闲时 < 50MB，扫描时 < 200MB
- 安装包大小: < 15MB

---

## 八、受影响文件结构

```
e:\ClearC\
  src-tauri/               # Rust 后端
    src/
      main.rs              # Tauri 入口
      commands/            # Tauri IPC 命令
        mod.rs
        scan.rs            # 扫描相关命令
        clean.rs           # 清理相关命令
        monitor.rs         # 监控相关命令
        backup.rs          # 备份/回滚命令
        rules.rs           # 规则引擎命令
        schedule.rs        # 定时任务命令
      scanner/             # 扫描引擎
        mod.rs
        system_junk.rs     # 系统垃圾扫描
        app_cache.rs       # 应用缓存扫描
        big_file.rs        # 大文件扫描
        duplicate.rs       # 重复文件检测
        privacy.rs         # 隐私痕迹扫描
        startup.rs         # 启动项扫描
      cleaner/             # 清理执行器
        mod.rs
      monitor/             # 实时监控
        mod.rs
        watcher.rs         # 文件变更监控
        tracker.rs         # 写入源追踪
      database/            # 数据库操作
        mod.rs
        models.rs
        migration.rs
      rules/               # 规则引擎
        mod.rs
        engine.rs
        templates.rs
      utils/               # 工具函数
        mod.rs
        hash.rs            # 哈希计算
        path.rs            # 路径处理
        privilege.rs       # 权限管理
    Cargo.toml
    tauri.conf.json
  
  src/                      # React 前端
    App.tsx
    main.tsx
    components/
      layout/
        Sidebar.tsx
        StatusBar.tsx
        TitleBar.tsx
      common/
        ScanProgress.tsx
        CleanConfirm.tsx
        CleanReport.tsx
        FileList.tsx
        RiskBadge.tsx
      modules/
        SmartClean/         # M01
        SystemJunk/         # M02
        AppCache/           # M03
        BigFile/            # M04
        DuplicateFile/      # M05
        StorageMap/         # M06
        PrivacyClean/       # M07
        StartupManager/     # M08
        UpdateClean/        # M09
        SpacePredict/       # M10
        CleanImpact/        # M11
        CleanSchedule/      # M12
        RollbackCenter/     # M13
        RuleEngine/         # M14
        DiskMonitor/        # M15
        Onboarding/         # M16
        HelpCenter/         # M17
    hooks/
      useScan.ts
      useClean.ts
      useMonitor.ts
    stores/
      scanStore.ts
      cleanStore.ts
      configStore.ts
    utils/
      format.ts
      constants.ts
    styles/
      global.css
  index.html
  package.json
  vite.config.ts
  tailwind.config.js
  tsconfig.json
```
