import { NavLink } from "react-router-dom";
import {
  Clear, Delete, Application, FileSearch, Copy, ChartPie,
  Lock, VacuumCleaner, UpdateRotation, TrendTwo, Analysis,
  Time, Undo, SettingConfig, Monitor, Help,
  Left, Right,
} from "@icon-park/react";
import { useConfigStore } from "@/stores/configStore";
import { NAV_ITEMS } from "@/utils/constants";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; theme?: "outline" | "filled" | "two-tone" | "multi-color" }>> = {
  Clean: Clear, Delete, Application, FileSearch, Copy, ChartPie,
  Lock, Startup: VacuumCleaner, UpdateRotation, TrendTwo, Analysis,
  Time, Undo, SettingConfig, Monitor, Help,
};

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useConfigStore();

  return (
    <div
      className="flex flex-col h-full shrink-0 transition-all duration-200"
      style={{
        width: sidebarCollapsed ? "56px" : "220px",
        background: "var(--color-surface)",
        borderRight: "1px solid var(--color-border-default)",
      }}
    >
      {/* Navigation items */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {NAV_ITEMS.map((item) => {
          const IconComponent = ICON_MAP[item.icon];
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-2.5 rounded-md cursor-pointer transition-colors h-9 mb-0.5 ${
                  isActive
                    ? "font-semibold"
                    : ""
                }`
              }
              style={({ isActive }) => ({
                background: isActive ? "var(--color-brand-subtle)" : "transparent",
                color: isActive ? "var(--color-brand)" : "var(--color-text-secondary)",
              })}
              onMouseEnter={(e) => {
                if (!e.currentTarget.classList.contains("active")) {
                  e.currentTarget.style.background = "var(--color-surface-inset)";
                  e.currentTarget.style.color = "var(--color-text-primary)";
                }
              }}
              onMouseLeave={(e) => {
                const isActive = e.currentTarget.getAttribute("aria-current") === "page";
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--color-text-secondary)";
                }
              }}
              title={sidebarCollapsed ? item.label : undefined}
            >
              {IconComponent && <IconComponent size={20} theme="outline" />}
              {!sidebarCollapsed && (
                <span className="text-sm truncate">{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div
        className="flex items-center justify-center h-9 border-t"
        style={{ borderColor: "var(--color-border-default)" }}
      >
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-8 h-7 rounded-md transition-colors"
          style={{ color: "var(--color-text-tertiary)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--color-surface-inset)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          {sidebarCollapsed ? <Right size={16} /> : <Left size={16} />}
        </button>
      </div>
    </div>
  );
}
