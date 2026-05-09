import React from "react";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200/70 py-8 dark:border-slate-800/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-center sm:flex-row sm:text-left">
        <div className="text-sm text-slate-600 dark:text-slate-300">
          Built with React, Tailwind, Express & MongoDB.
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          TodoFlow © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}

