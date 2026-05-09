import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Input({ label, hint, className, ...props }) {
  return (
    <label className="block">
      {label ? (
        <div className="mb-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
          {label}
        </div>
      ) : null}
      <input
        className={cn(
          "h-11 w-full rounded-xl bg-white/80 px-4 text-sm text-slate-900 shadow-sm ring-1 ring-slate-200",
          "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40",
          "dark:bg-slate-900/50 dark:text-slate-100 dark:ring-slate-800",
          className
        )}
        {...props}
      />
      {hint ? (
        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{hint}</div>
      ) : null}
    </label>
  );
}

