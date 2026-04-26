<p align="center">
  <img src="docs/logo.svg" alt="ClearC Logo" width="160" height="160" />
</p>

<h1 align="center">ClearC</h1>

<p align="center">
  <strong>Smart C-Drive Cleaner for Windows</strong>
</p>

<p align="center">
  <a href="README_zh.md">中文文档</a> | English
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

## Overview

ClearC is an intelligent C-drive cleaning tool for Windows, built with **Tauri 2** (Rust backend + React frontend). It goes beyond simple disk cleanup by providing smart analysis, safety-first cleaning, and real-time monitoring capabilities.

## Key Features

### Smart Cleaning
- **One-Click Smart Clean** — Automatically scans and categorizes junk files into 3 risk levels (safe / warning / danger), with safe items pre-selected
- **System Junk Cleaner** — 8 categories: Windows temp files, Update cache, System logs, Thumbnail cache, Recycle bin, Error reports, Font cache, Delivery optimization
- **App Cache Cleaner** — 5 tabbed categories: Browser, Dev tools, Chat apps, Game platforms, Design tools, with trend tracking and growth alerts

### Deep Analysis
- **Big File Analyzer** — Configurable threshold, multi-sort/filter, orphan file detection with reason explanation
- **Duplicate File Detector** — 3 scan modes (Quick: size+name, Standard: size+partial hash, Exact: full SHA-256), auto-select with keep strategy
- **Storage Heatmap** — Treemap visualization + ring chart, directory drill-down, space change timeline
- **Smart Space Prediction** — Daily consumption rate, days-until-full prediction, Top 5 growth source ranking, threshold alerts

### Privacy & Safety
- **Privacy Trace Cleaner** — Browser / System / App traces, privacy score gauge (0–100), risk-level badges
- **Cleanup Impact Assessment** — Pre-clean risk evaluation, affected process detection, one-click close, auto-deselect high-risk items, alternative suggestions
- **Security Whitelist** — 35+ protected system directories, file extension protection, admin privilege detection, UAC elevation prompts

### Management & Automation
- **Startup Manager** — Enable / disable / delay startup items, safety rating, impact assessment, publisher info
- **Scheduled Cleanup** — Create cleanup schedules with frequency, module selection, and conditions
- **Rollback Center** — Full cleanup history, backup management, one-click restore, export backups
- **Rule Engine** — Custom cleanup rules with condition/action/priority, built-in templates, dry-run testing
- **Real-time Disk Monitor** — Live space change chart, write source tracking (process / PID / path / rate), notification center

### UX Innovation
- **First-time Onboarding** — 6-step interactive guide covering features, safety, and initial config
- **Help Center** — FAQ with search, troubleshooting guides, keyboard shortcuts, about page
- **Custom Title Bar** — Draggable region + minimize/maximize/close, close-to-tray behavior
- **System Tray** — Right-click menu (show / quick-scan / quit), double-click to restore, C-drive status tooltip
- **Dark / Light / System Theme** — Full theme support with CSS variables, persisted preference
- **Collapsible Sidebar** — 56 px icon-only / 220 px full, smooth transition

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Desktop Framework | Tauri 2 (Rust + WebView) |
| Frontend | React 19 + TypeScript 5 + Vite 6 |
| Styling | TailwindCSS + CSS Custom Properties |
| State Management | Zustand with localStorage persistence |
| Icons | ByteDance IconPark (outline theme) |
| Database | SQLite via rusqlite |
| Backend | Rust (Windows API, SHA-2, ReadDirectoryChangesW) |
| CI/CD | GitHub Actions (x86_64 + aarch64) |

## Project Structure

```
ClearC/
├── .github/workflows/build.yml     # CI/CD pipeline
├── DESIGN.md                       # 9-section design system specification
├── docs/logo.svg                   # Project logo
├── src/                            # Frontend (React + TypeScript)
│   ├── App.tsx                     # Router with 17 module routes
│   ├── components/
│   │   ├── layout/                 # TitleBar, Sidebar, StatusBar
│   │   ├── common/                 # Button, Badge, StatsCard, ScanProgress,
│   │   │                           # CleanConfirm, CleanReport, FileList,
│   │   │                           # EmptyState, PermissionModal
│   │   └── modules/                # 17 feature modules
│   │       ├── SmartClean/         # M01: One-click smart clean
│   │       ├── SystemJunk/         # M02: System junk cleaner
│   │       ├── AppCache/           # M03: App cache cleaner
│   │       ├── BigFile/            # M04: Big file analyzer
│   │       ├── DuplicateFile/      # M05: Duplicate file detector
│   │       ├── StorageMap/         # M06: Storage heatmap
│   │       ├── PrivacyClean/       # M07: Privacy trace cleaner
│   │       ├── StartupManager/     # M08: Startup item manager
│   │       ├── UpdateClean/        # M09: System update cleaner
│   │       ├── SpacePredict/       # M10: Space prediction
│   │       ├── CleanImpact/        # M11: Cleanup impact assessment
│   │       ├── CleanSchedule/      # M12: Scheduled cleanup
│   │       ├── RollbackCenter/     # M13: Rollback center
│   │       ├── RuleEngine/         # M14: Rule engine
│   │       ├── DiskMonitor/        # M15: Real-time disk monitor
│   │       ├── Onboarding/         # M16: First-time guide
│   │       └── HelpCenter/         # M17: Help center
│   ├── hooks/                      # useScan, useClean, useIpc, useTauriEvent
│   ├── stores/                     # Zustand stores (configStore)
│   └── utils/                      # format, constants, security
├── src-tauri/                      # Backend (Rust)
│   ├── Cargo.toml                  # Rust dependencies
│   ├── tauri.conf.json             # Tauri configuration
│   └── src/
│       ├── lib.rs                  # App entry, tray, IPC registration
│       ├── commands/               # IPC command handlers
│       ├── scanner/                # Scanner engine (6 modules)
│       ├── cleaner/                # Cleanup executor with backup
│       ├── monitor/                # File watcher + process tracker
│       ├── database/               # SQLite + 7 tables + migration
│       ├── rules/                  # Rule engine + templates
│       └── utils/                  # hash, path, privilege, whitelist
└── LICENSE                         # MIT License
```

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Rust** 1.77+ (install via [rustup](https://rustup.rs/))
- **Visual Studio Build Tools** 2022 (with C++ desktop development workload)
- **Windows 10/11**

### Development

```bash
# Clone the repository
git clone https://github.com/Vogadero/ClearC.git
cd ClearC

# Install frontend dependencies
npm install

# Start development server (frontend only, no Rust backend)
npm run dev

# Or start with Tauri (requires Rust toolchain)
npx tauri dev
```

### Build

```bash
# Build frontend only
npm run build

# Build Tauri application (requires Rust toolchain)
npx tauri build
```

### Without Rust Toolchain

If you don't have the Rust compilation environment set up locally, you can still develop the frontend:

```bash
npm install
npm run dev
```

The frontend runs with mock data and gracefully falls back when Tauri APIs are unavailable. The Rust backend will be compiled via GitHub Actions CI.

## Design System

ClearC follows a structured design system documented in `DESIGN.md` with 9 sections:

1. **Visual Theme** — Light/dark mode, canvas/surface/elevated layer system
2. **Color Palette** — 8 semantic color groups with subtle variants
3. **Typography** — 8-level type scale (display -> caption)
4. **Components** — Button, Badge, StatsCard, ScanProgress, etc.
5. **Layout** — TitleBar(36px) + Sidebar(56/220px) + Content + StatusBar(28px)
6. **Depth** — 3-level elevation system
7. **Do's & Don'ts** — UI conventions and anti-patterns
8. **Responsive** — Compact/default/wide breakpoints
9. **Agent Prompt Guide** — For AI-assisted UI generation

## Innovation Highlights

| Feature | Innovation |
|---------|-----------|
| Cleanup Impact Assessment | Pre-clean risk analysis with process detection and auto-deselect |
| Smart Space Prediction | ML-ready space consumption forecast with growth source ranking |
| Storage Heatmap | Treemap + ring chart visualization with directory drill-down |
| Real-time Disk Monitor | ReadDirectoryChangesW-based write source tracking |
| Rule Engine | Custom rules with dry-run, priority system, and templates |
| Rollback Center | Full cleanup history with one-click backup restore |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Author

- **Vogadero** - [GitHub](https://github.com/Vogadero) - 15732651140@163.com

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Tauri](https://tauri.app/) — Desktop application framework
- [IconPark](https://iconpark.oceanengine.com/) — ByteDance open-source icon library
- [React](https://react.dev/) — UI library
- [TailwindCSS](https://tailwindcss.com/) — Utility-first CSS framework
