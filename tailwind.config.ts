import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F7F6F2",
        "paper-dim": "#EFEDE6",
        ink: "#1B1B18",
        "ink-soft": "#5C5950",
        line: "#D8D5CC",
        signal: "#FF5A1F",
        "signal-dark": "#D6480F",
        stamp: "#1F7A53",
        "stamp-soft": "#E3EFE8",
        warn: "#B23B3B",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;