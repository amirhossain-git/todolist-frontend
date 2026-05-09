import React from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "./Input";

export function Toolbar({
  q,
  setQ,
  status,
  setStatus,
  sort,
  setSort,
  limit,
  setLimit,
  total
}) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-sm dark:border-slate-800/70 dark:bg-slate-950/30">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid w-full gap-3 md:grid-cols-2 lg:max-w-3xl lg:grid-cols-3">
          <div className="relative">
            <div className="pointer-events-none absolute left-3 top-[38px] text-slate-400">
              <FiSearch />
            </div>
            <Input
              label="Search"
              placeholder="Search todos…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-10"
            />
          </div>

          <label className="block">
            <div className="mb-1 text-xs font-semibold text-slate-600 dark:text-slate-300">Status</div>
            <select
              className="h-11 w-full rounded-xl bg-white/80 px-4 text-sm shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400/40 dark:bg-slate-900/50 dark:ring-slate-800"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </label>

          <label className="block">
            <div className="mb-1 text-xs font-semibold text-slate-600 dark:text-slate-300">Sort</div>
            <select
              className="h-11 w-full rounded-xl bg-white/80 px-4 text-sm shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400/40 dark:bg-slate-900/50 dark:ring-slate-800"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </label>
        </div>

        <div className="flex items-center justify-between gap-3 lg:justify-end">
          <label className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Per page</span>
            <select
              className="h-9 rounded-xl bg-white/80 px-3 text-sm shadow-sm ring-1 ring-slate-200 dark:bg-slate-900/50 dark:ring-slate-800"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option value={6}>6</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </label>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Total: <span className="font-semibold text-slate-700 dark:text-slate-200">{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

