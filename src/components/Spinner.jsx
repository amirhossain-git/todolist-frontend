import React from "react";

export function Spinner({ label = "Loading..." }) {
  return (
    <div className="flex items-center justify-center gap-3 py-10">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-sky-500 dark:border-slate-700 dark:border-t-sky-400" />
      <div className="text-sm text-slate-600 dark:text-slate-300">{label}</div>
    </div>
  );
}

