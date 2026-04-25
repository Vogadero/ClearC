/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light mode
        canvas: {
          DEFAULT: "#F7F8FA",
          dark: "#17171A",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#232326",
          elevated: {
            DEFAULT: "#FFFFFF",
            dark: "#2C2C30",
          },
          inset: {
            DEFAULT: "#F0F1F3",
            dark: "#1A1A1D",
          },
        },
        border: {
          default: {
            DEFAULT: "#E5E6EB",
            dark: "#3D3D40",
          },
          subtle: {
            DEFAULT: "#F0F1F3",
            dark: "#2C2C30",
          },
        },
        text: {
          primary: {
            DEFAULT: "#1D2129",
            dark: "#F0F0F2",
          },
          secondary: {
            DEFAULT: "#4E5969",
            dark: "#A8A8AD",
          },
          tertiary: {
            DEFAULT: "#86909C",
            dark: "#6B6B70",
          },
        },
        brand: {
          DEFAULT: "#1677FF",
          hover: "#4096FF",
          active: "#0958D9",
          subtle: {
            DEFAULT: "#E8F3FF",
            dark: "#1A2E4A",
          },
          dark: "#3C8AFF",
          "dark-hover": "#5A9AFF",
          "dark-active": "#2A6FD6",
        },
        safe: {
          DEFAULT: "#00B42A",
          subtle: {
            DEFAULT: "#E8FFEA",
            dark: "#0E2A15",
          },
          dark: "#23C343",
        },
        warn: {
          DEFAULT: "#FF7D00",
          subtle: {
            DEFAULT: "#FFF7E8",
            dark: "#2A2010",
          },
          dark: "#FF9A2E",
        },
        danger: {
          DEFAULT: "#F53F3F",
          subtle: {
            DEFAULT: "#FFECE8",
            dark: "#2A1515",
          },
          dark: "#F76560",
        },
        info: {
          subtle: {
            DEFAULT: "#E8F3FF",
            dark: "#1A2E4A",
          },
        },
      },
      fontFamily: {
        sans: [
          '"Segoe UI Variable"',
          '"Segoe UI"',
          '"Microsoft YaHei UI"',
          "system-ui",
          "sans-serif",
        ],
        mono: ['"Cascadia Code"', "Consolas", '"Courier New"', "monospace"],
      },
      fontSize: {
        display: ["28px", { lineHeight: "36px", fontWeight: "600", letterSpacing: "-0.02em" }],
        h1: ["20px", { lineHeight: "28px", fontWeight: "600", letterSpacing: "-0.01em" }],
        h2: ["16px", { lineHeight: "24px", fontWeight: "600" }],
        h3: ["14px", { lineHeight: "22px", fontWeight: "600" }],
        "body-sm": ["13px", { lineHeight: "20px" }],
        caption: ["12px", { lineHeight: "18px" }],
        mono: ["13px", { lineHeight: "20px", fontFamily: '"Cascadia Code", Consolas, "Courier New", monospace' }],
      },
      spacing: {
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "8": "32px",
        "10": "40px",
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
      },
    },
  },
  plugins: [],
};
