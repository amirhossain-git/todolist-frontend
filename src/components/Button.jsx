import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 " +
    "focus:outline-none focus:ring-2 focus:ring-sky-400/50 disabled:opacity-60 disabled:cursor-not-allowed " +
    "active:scale-[0.98]";

  const variants = {
    primary:
      "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-soft hover:shadow-lg hover:brightness-110",
    secondary:
      "bg-white/80 text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-white dark:bg-slate-900/60 dark:text-slate-100 dark:ring-slate-800",
    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900/40",
    danger:
      "bg-rose-600 text-white shadow-sm hover:bg-rose-500"
  };

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-sm",
    lg: "h-12 px-5 text-base"
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

