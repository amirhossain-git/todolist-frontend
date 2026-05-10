import React from "react";
import { FiCheckCircle, FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../state/theme";

export function Navbar() {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/55">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow-soft">
            <FiCheckCircle />
          </div>
          <div>
            <div className="text-sm font-extrabold tracking-tight">TodoFlow</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Modern task manager</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">By Amirhossain Mostafavi</div>
          </div>
        </div>

        <button
          onClick={toggle}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-900"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <FiSun /> : <FiMoon />}
          <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
        </button>
      </div>
    </header>
  );
}

