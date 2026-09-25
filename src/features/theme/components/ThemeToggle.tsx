"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="theme-transition flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-theme bg-card text-fg transition hover:opacity-80"
    >
      {isLight ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  );
}
