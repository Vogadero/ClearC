# ClearC Design System

> Following the awesome-design-md 9-section DESIGN.md specification format.

## Section 1: Visual Theme & Atmosphere

**Design Philosophy**: Precise, restrained, and transparent. As a system utility, ClearC pursues a "high information density, low visual noise" interface. The UI must convey professional credibility — no flashy decorations, let data and actions be the visual focus.

**Mood Keywords**: Precise / Calm / Transparent / Efficient

**Visual Density**: Medium-high. Core data (space size, file count, progress) takes priority; auxiliary information is collapsible. Tight but not cramped line spacing.

**Style Reference**: Linear (dark precision) + Windows 11 Fluent Design (rounded corners and layered surfaces)

## Section 2: Color Palette & Roles

### Light Mode

| Semantic Name | Value | Role |
|---|---|---|
| `bg-canvas` | `#F7F8FA` | Page background |
| `bg-surface` | `#FFFFFF` | Card/panel background |
| `bg-surface-elevated` | `#FFFFFF` | Modal/floating layer background |
| `bg-inset` | `#F0F1F3` | Input/embedded area background |
| `border-default` | `#E5E6EB` | Default border |
| `border-subtle` | `#F0F1F3` | Faint divider |
| `text-primary` | `#1D2129` | Primary text |
| `text-secondary` | `#4E5969` | Secondary text |
| `text-tertiary` | `#86909C` | Placeholder/hint text |
| `accent-brand` | `#1677FF` | Brand blue / primary action |
| `accent-brand-hover` | `#4096FF` | Brand blue hover |
| `accent-brand-active` | `#0958D9` | Brand blue pressed |
| `accent-brand-subtle` | `#E8F3FF` | Brand blue light background (selected state) |
| `status-safe` | `#00B42A` | Safe / success |
| `status-safe-subtle` | `#E8FFEA` | Safe light background |
| `status-warn` | `#FF7D00` | Warning |
| `status-warn-subtle` | `#FFF7E8` | Warning light background |
| `status-danger` | `#F53F3F` | Danger / error |
| `status-danger-subtle` | `#FFECE8` | Danger light background |
| `status-info` | `#1677FF` | Informational |
| `status-info-subtle` | `#E8F3FF` | Info light background |

### Dark Mode

| Semantic Name | Value | Role |
|---|---|---|
| `bg-canvas` | `#17171A` | Page background |
| `bg-surface` | `#232326` | Card/panel background |
| `bg-surface-elevated` | `#2C2C30` | Modal/floating layer background |
| `bg-inset` | `#1A1A1D` | Input/embedded area background |
| `border-default` | `#3D3D40` | Default border |
| `border-subtle` | `#2C2C30` | Faint divider |
| `text-primary` | `#F0F0F2` | Primary text |
| `text-secondary` | `#A8A8AD` | Secondary text |
| `text-tertiary` | `#6B6B70` | Placeholder/hint text |
| `accent-brand` | `#3C8AFF` | Brand blue / primary action |
| `accent-brand-hover` | `#5A9AFF` | Brand blue hover |
| `accent-brand-active` | `#2A6FD6` | Brand blue pressed |
| `accent-brand-subtle` | `#1A2E4A` | Brand blue light background |
| `status-safe` | `#23C343` | Safe / success |
| `status-safe-subtle` | `#0E2A15` | Safe light background |
| `status-warn` | `#FF9A2E` | Warning |
| `status-warn-subtle` | `#2A2010` | Warning light background |
| `status-danger` | `#F76560` | Danger / error |
| `status-danger-subtle` | `#2A1515` | Danger light background |

## Section 3: Typography Rules

**Font Families**:

| Role | Font Stack | Notes |
|---|---|---|
| Primary | `"Segoe UI Variable", "Segoe UI", "Microsoft YaHei UI", system-ui, sans-serif` | Western Segoe UI + Chinese Microsoft YaHei |
| Monospace | `"Cascadia Code", "Consolas", "Courier New", monospace` | Code / paths / hash values |

**Type Scale**:

| Level | Size | Weight | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|
| `display` | 28px | 600 | 36px | -0.02em | Large number display (e.g. "12.8 GB") |
| `h1` | 20px | 600 | 28px | -0.01em | Module titles |
| `h2` | 16px | 600 | 24px | 0 | Card titles / section titles |
| `h3` | 14px | 600 | 22px | 0 | Sub-titles |
| `body` | 14px | 400 | 22px | 0 | Body text |
| `body-sm` | 13px | 400 | 20px | 0 | Auxiliary description |
| `caption` | 12px | 400 | 18px | 0 | Labels / notes |
| `mono` | 13px | 400 | 20px | 0 | Paths / hashes / code |

**OpenType Features**: Enable `tnum` (tabular figures) for number alignment.

## Section 4: Component Stylings

### Buttons

| Variant | Style | Hover | Active | Disabled |
|---|---|---|---|---|
| `primary` | `bg: accent-brand, text: white, radius: 6px, h: 32px, px: 16px` | `bg: accent-brand-hover` | `bg: accent-brand-active` | `opacity: 0.4, cursor: not-allowed` |
| `secondary` | `bg: transparent, text: accent-brand, border: 1px solid accent-brand, radius: 6px` | `bg: accent-brand-subtle` | `bg: accent-brand-subtle, border-color: accent-brand-active` | `opacity: 0.4` |
| `ghost` | `bg: transparent, text: text-secondary, radius: 6px` | `bg: bg-inset, text: text-primary` | `bg: bg-inset` | `opacity: 0.4` |
| `danger` | `bg: status-danger, text: white, radius: 6px` | `bg: #CC3030` | `bg: #B02020` | `opacity: 0.4` |

### Cards

- Background: `bg-surface`
- Border: `1px solid border-default`
- Border radius: `8px`
- Padding: `16px`
- Hover: `border-color: accent-brand` (interactive cards only)
- Shadow: none (rely on border and background for depth)

### Inputs

- Height: `32px`
- Background: `bg-inset`
- Border: `1px solid border-default`
- Border radius: `6px`
- Focus: `border-color: accent-brand, box-shadow: 0 0 0 2px accent-brand-subtle`
- Placeholder: `text-tertiary`

### Navigation Items

- Default: `bg: transparent, text: text-secondary, radius: 6px, h: 36px`
- Hover: `bg: bg-inset, text: text-primary`
- Active: `bg: accent-brand-subtle, text: accent-brand, font-weight: 600`
- Icon: 20px, gap with text: 10px

### Progress Bar

- Height: `6px`
- Track: `bg-inset, radius: 3px`
- Fill: `accent-brand, radius: 3px`
- Animation: `transition: width 300ms ease`
- Percentage text: `caption` level, right of the bar

### Badges / Tags

- Safe: `bg: status-safe-subtle, text: status-safe, radius: 4px, px: 6px, py: 2px`
- Warn: `bg: status-warn-subtle, text: status-warn`
- Danger: `bg: status-danger-subtle, text: status-danger`
- Info: `bg: status-info-subtle, text: status-info`

### Modals

- Overlay: `bg-black/50`
- Container: `bg-surface-elevated, radius: 12px, shadow: 0 8px 40px rgba(0,0,0,0.12)`
- Max width: `480px`
- Title: `h2` level
- Button area: right-aligned, primary button on the right

### Tooltips

- Background: `bg-surface-elevated`
- Border: `1px solid border-default`
- Border radius: `6px`
- Padding: `6px 10px`
- Text: `caption` level
- Max width: `280px`

## Section 5: Layout Principles

**Spacing System** (4px base):

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Icon-text gap |
| `space-2` | 8px | Compact element gap |
| `space-3` | 12px | Same-group element gap |
| `space-4` | 16px | Card padding, default gap |
| `space-5` | 20px | Section gap |
| `space-6` | 24px | Large section gap |
| `space-8` | 32px | Module gap |
| `space-10` | 40px | Page-level gap |

**Sidebar**:
- Expanded width: `220px`
- Collapsed width: `56px`
- Icon centered (collapsed), icon+text left-aligned (expanded)

**Content Area**:
- Max content width: `960px` (centered)
- Card grid: auto-fill, min column width `280px`

**Status Bar**:
- Height: `36px`
- Padding: `0 space-4`

## Section 6: Depth & Elevation

**Layer System** (no shadows, rely on background luminance stepping):

| Level | Light BG | Dark BG | Usage |
|---|---|---|---|
| L0 - Canvas | `#F7F8FA` | `#17171A` | Page base |
| L1 - Surface | `#FFFFFF` | `#232326` | Cards / panels |
| L2 - Elevated | `#FFFFFF` | `#2C2C30` | Modals / popovers / tooltips |
| L3 - Overlay | `rgba(0,0,0,0.5)` | `rgba(0,0,0,0.6)` | Backdrop |

**Single Exception**: Modals use `0 8px 40px rgba(0,0,0,0.12)` shadow for emphasis.

**Border as Depth**: Cards use `1px solid border-default` border instead of shadow to define boundaries, keeping the interface clean.

## Section 7: Do's and Don'ts

### Do

- Use IconPark outline-style icons paired with text to convey meaning
- Use tabular-nums for numeric data (`font-variant-numeric: tabular-nums`)
- Use consistent spacing between cards (`space-4`)
- Use red emphasis for dangerous actions and require double confirmation
- Provide a guiding action button in empty states
- Use virtual scrolling for long lists to avoid performance issues

### Don't

- NEVER use Emoji as functional icons or UI decoration
- NEVER use pure black (`#000000`) text in light mode
- NEVER use heavy shadows on cards (only Modals may have shadows)
- NEVER use high-saturation solid color blocks as large backgrounds in dark mode
- NEVER create icon-only buttons without text or tooltips
- NEVER auto-delete files without user confirmation
- NEVER hide the cancel button during a clean operation

## Section 8: Responsive Behavior

ClearC is a desktop native application. Window size range: min `800x600`, default `1100x700`.

| Breakpoint | Width | Behavior |
|---|---|---|
| `compact` | < 900px | Sidebar auto-collapses to icon-only mode |
| `default` | 900-1200px | Sidebar expanded, content area single/double column adaptive |
| `wide` | > 1200px | Sidebar expanded, content area can show 3-column cards |

**Window Scaling**:
- Sidebar: user can manually toggle, compact breakpoint auto-collapses
- Card grid: adaptive columns (CSS Grid `auto-fill, minmax(280px, 1fr)`)
- Heatmap: proportional scaling, below 600px min-width switch to list view

## Section 9: Agent Prompt Guide

**Quick Color Reference**:
- Brand blue: `#1677FF` / dark `#3C8AFF`
- Safe green: `#00B42A` / dark `#23C343`
- Warning orange: `#FF7D00` / dark `#FF9A2E`
- Danger red: `#F53F3F` / dark `#F76560`

**Generic Prompt Template**:
```
Build [component name] using the ClearC design system:
- Light background bg-canvas(#F7F8FA), cards bg-surface(#FFFFFF) with 1px border-default(#E5E6EB) border
- Primary actions use accent-brand(#1677FF) filled button, white text
- Numeric values use display level (28px/600) + tabular-nums
- Status tags use corresponding status-*-subtle background + status-* text
- Icons use @icon-park/react outline style, 16-20px
- Border radius 6-8px, spacing follows 4px base
- Dark mode switches to corresponding dark color values
```
