<p align="center">
  <img src="docs/logo.svg" alt="ClearC Logo" width="160" height="160" />
</p>

<h1 align="center">ClearC</h1>

<p align="center">
  <strong>Windows C 盘智能清理工具</strong>
</p>

<p align="center">
  中文 | <a href="README.md">English</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Tauri-2.0-blue?logo=tauri" alt="Tauri 2.0" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Rust-1.77+-DEA584?logo=rust" alt="Rust" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License" />
  <img src="https://img.shields.io/badge/Platform-Windows-0078D4?logo=windows" alt="Windows" />
</p>

---

## 项目简介

ClearC 是一款基于 **Tauri 2**（Rust 后端 + React 前端）构建的 Windows C 盘智能清理工具。它超越简单的磁盘清理，提供智能分析、安全优先的清理策略和实时监控能力。

## 核心功能

### 智能清理
- **一键智能清理** — 自动扫描并将垃圾文件分为 3 个风险等级（安全 / 警告 / 危险），安全项默认勾选
- **系统垃圾清理** — 8 大类别：Windows 临时文件、更新缓存、系统日志、缩略图缓存、回收站、错误报告、字体缓存、传递优化
- **应用缓存清理** — 5 个分类标签页：浏览器、开发工具、聊天应用、游戏平台、设计工具，支持趋势追踪和增长预警

### 深度分析
- **大文件分析器** — 可配置阈值、多维排序/筛选、孤立文件检测及原因说明
- **重复文件检测** — 3 种扫描模式（快速：大小+文件名、标准：大小+头尾哈希、精确：全文件 SHA-256），智能保留策略
- **存储热力图** — 矩形树图 + 环形图可视化，目录层级下钻，空间变化时间线
- **智能空间预测** — 每日消耗速率、预计耗尽天数、Top 5 增长源排名、阈值预警

### 隐私与安全
- **隐私痕迹清理** — 浏览器/系统/应用隐私痕迹，隐私评分仪表盘（0–100），风险等级标签
- **清理影响评估** — 清理前风险评估，占用进程检测，一键关闭关联应用，自动取消高风险项，替代方案推荐
- **安全白名单** — 35+ 受保护系统目录，文件扩展名保护，管理员权限检测，UAC 提权提示

### 管理与自动化
- **启动项管理** — 启用/禁用/延迟启动项，安全评级，影响评估，发布者信息
- **定时清理计划** — 创建清理计划，设置频率、模块选择和条件
- **清理回滚中心** — 完整清理历史，备份管理，一键恢复，导出备份
- **存储规则引擎** — 自定义清理规则（条件/动作/优先级），内置模板，干运行测试
- **实时磁盘监控** — 实时空间变化曲线，写入源追踪（进程/PID/路径/速率），通知中心

### 用户体验创新
- **首次使用引导** — 6 步交互式引导，涵盖功能介绍、安全承诺、初始配置
- **帮助中心** — FAQ 搜索、问题排查指南、快捷键说明、关于页面
- **自定义标题栏** — 拖拽区域 + 最小化/最大化/关闭，关闭时最小化到托盘
- **系统托盘** — 右键菜单（显示/快速扫描/退出），双击恢复窗口，C 盘状态提示
- **深色/浅色/跟随系统主题** — 完整主题支持，CSS 变量驱动，偏好持久化
- **可折叠侧边栏** — 56 px 仅图标 / 220 px 完整模式，平滑过渡动画

## 技术栈

| 层级 | 技术 |
|------|------|
| 桌面框架 | Tauri 2（Rust + WebView） |
| 前端 | React 19 + TypeScript 5 + Vite 6 |
| 样式 | TailwindCSS + CSS 自定义属性 |
| 状态管理 | Zustand + localStorage 持久化 |
| 图标 | 字节跳动 IconPark（outline 主题） |
| 数据库 | SQLite（rusqlite） |
| 后端 | Rust（Windows API、SHA-2、ReadDirectoryChangesW） |
| CI/CD | GitHub Actions（x86_64 + aarch64） |

## 项目结构

```
ClearC/
├── .github/workflows/build.yml     # CI/CD 流水线
├── DESIGN.md                       # 9 章节设计系统规范
├── docs/logo.svg                   # 项目 Logo
├── src/                            # 前端（React + TypeScript）
│   ├── App.tsx                     # 路由：17 个功能模块
│   ├── components/
│   │   ├── layout/                 # TitleBar, Sidebar, StatusBar
│   │   ├── common/                 # Button, Badge, StatsCard, ScanProgress,
│   │   │                           # CleanConfirm, CleanReport, FileList,
│   │   │                           # EmptyState, PermissionModal
│   │   └── modules/                # 17 个功能模块
│   │       ├── SmartClean/         # M01：一键智能清理
│   │       ├── SystemJunk/         # M02：系统垃圾清理
│   │       ├── AppCache/           # M03：应用缓存清理
│   │       ├── BigFile/            # M04：大文件分析器
│   │       ├── DuplicateFile/      # M05：重复文件检测
│   │       ├── StorageMap/         # M06：存储热力图
│   │       ├── PrivacyClean/       # M07：隐私痕迹清理
│   │       ├── StartupManager/     # M08：启动项管理
│   │       ├── UpdateClean/        # M09：系统更新清理
│   │       ├── SpacePredict/       # M10：智能空间预测
│   │       ├── CleanImpact/        # M11：清理影响评估
│   │       ├── CleanSchedule/      # M12：定时清理计划
│   │       ├── RollbackCenter/     # M13：清理回滚中心
│   │       ├── RuleEngine/         # M14：存储规则引擎
│   │       ├── DiskMonitor/        # M15：实时磁盘监控
│   │       ├── Onboarding/         # M16：首次使用引导
│   │       └── HelpCenter/         # M17：帮助中心
│   ├── hooks/                      # useScan, useClean, useIpc, useTauriEvent
│   ├── stores/                     # Zustand 状态管理（configStore）
│   └── utils/                      # format, constants, security
├── src-tauri/                      # 后端（Rust）
│   ├── Cargo.toml                  # Rust 依赖
│   ├── tauri.conf.json             # Tauri 配置
│   └── src/
│       ├── lib.rs                  # 应用入口、托盘、IPC 注册
│       ├── commands/               # IPC 命令处理器
│       ├── scanner/                # 扫描引擎（6 个模块）
│       ├── cleaner/                # 清理执行器（含备份）
│       ├── monitor/                # 文件监控 + 进程追踪
│       ├── database/               # SQLite + 7 张表 + 迁移
│       ├── rules/                  # 规则引擎 + 模板
│       └── utils/                  # hash, path, privilege, whitelist
└── LICENSE                         # MIT 许可证
```

## 快速开始

### 环境要求

- **Node.js** 18+ 及 npm
- **Rust** 1.77+（通过 [rustup](https://rustup.rs/) 安装）
- **Visual Studio Build Tools** 2022（C++ 桌面开发工作负载）
- **Windows 10/11**

### 开发

```bash
# 克隆仓库
git clone https://github.com/Vogadero/ClearC.git
cd ClearC

# 安装前端依赖
npm install

# 启动开发服务器（仅前端，无 Rust 后端）
npm run dev

# 或使用 Tauri 启动（需要 Rust 工具链）
npx tauri dev
```

### 构建

```bash
# 仅构建前端
npm run build

# 构建 Tauri 应用（需要 Rust 工具链）
npx tauri build
```

### 无 Rust 工具链开发

如果本地没有配置 Rust 编译环境，仍然可以进行前端开发：

```bash
npm install
npm run dev
```

前端使用模拟数据运行，在 Tauri API 不可用时优雅降级。Rust 后端将通过 GitHub Actions CI 编译。

## 设计系统

ClearC 遵循 `DESIGN.md` 中文档化的结构化设计系统，包含 9 个章节：

1. **视觉主题** — 浅色/深色模式，canvas/surface/elevated 层级系统
2. **色板** — 8 个语义色彩组及 subtle 变体
3. **字体排版** — 8 级字号体系（display -> caption）
4. **组件** — Button、Badge、StatsCard、ScanProgress 等
5. **布局** — TitleBar(36px) + Sidebar(56/220px) + Content + StatusBar(28px)
6. **层级** — 3 级阴影系统
7. **规范与禁忌** — UI 约定和反模式
8. **响应式** — compact / default / wide 断点
9. **Agent 提示指南** — 用于 AI 辅助 UI 生成

## 创新亮点

| 功能 | 创新点 |
|------|--------|
| 清理影响评估 | 清理前风险分析 + 进程检测 + 自动取消高风险项 |
| 智能空间预测 | ML-ready 空间消耗预测 + 增长源排名 |
| 存储热力图 | 矩形树图 + 环形图可视化 + 目录下钻 |
| 实时磁盘监控 | 基于 ReadDirectoryChangesW 的写入源追踪 |
| 规则引擎 | 自定义规则 + 干运行 + 优先级系统 + 模板库 |
| 回滚中心 | 完整清理历史 + 一键备份恢复 |

## 参与贡献

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 发起 Pull Request

## 作者

- **Vogadero** - [GitHub](https://github.com/Vogadero) - 15732651140@163.com

## 开源许可

本项目基于 MIT 许可证开源 — 详见 [LICENSE](LICENSE) 文件。

## 致谢

- [Tauri](https://tauri.app/) — 桌面应用框架
- [IconPark](https://iconpark.oceanengine.com/) — 字节跳动开源图标库
- [React](https://react.dev/) — UI 库
- [TailwindCSS](https://tailwindcss.com/) — 实用优先 CSS 框架
