import React from "react";
import { FiInbox } from "react-icons/fi";

export function EmptyState({ title = "No todos yet", subtitle = "Add your first task to get started." }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-200">
        <FiInbox />
      </div>
      <div className="text-base font-semibold">{title}</div>
      <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{subtitle}</div>
    </div>
  );
}

