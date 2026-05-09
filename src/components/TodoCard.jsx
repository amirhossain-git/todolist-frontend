import React from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiEdit2, FiTrash2, FiCheck } from "react-icons/fi";
import { formatDue, isOverdue } from "../lib/date";
import { Button } from "./Button";

export function TodoCard({ todo, onToggleComplete, onEdit, onDelete }) {
  const overdue = isOverdue(todo.dueDate) && !todo.completed;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className={[
        "group rounded-2xl border bg-white/80 p-4 shadow-sm ring-1 ring-transparent transition",
        "hover:-translate-y-[2px] hover:shadow-soft hover:ring-slate-200",
        "dark:bg-slate-950/50 dark:hover:ring-slate-800",
        todo.completed
          ? "border-emerald-200/60 dark:border-emerald-900/30"
          : "border-slate-200/70 dark:border-slate-800/70"
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div
              className={[
                "inline-flex h-5 w-5 items-center justify-center rounded-md border transition",
                todo.completed
                  ? "border-emerald-400/50 bg-emerald-500 text-white"
                  : "border-slate-300 bg-white text-transparent dark:border-slate-700 dark:bg-slate-950"
              ].join(" ")}
              aria-hidden="true"
            >
              <FiCheck className="text-[14px]" />
            </div>
            <div className="truncate text-sm font-bold tracking-tight">
              <span className={todo.completed ? "text-slate-500 line-through dark:text-slate-400" : ""}>
                {todo.title}
              </span>
            </div>
          </div>

          {todo.notes ? (
            <div className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{todo.notes}</div>
          ) : null}

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span
              className={[
                "inline-flex items-center gap-1 rounded-full px-2 py-1 ring-1",
                overdue
                  ? "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-950/30 dark:text-rose-200 dark:ring-rose-900/40"
                  : "bg-slate-50 text-slate-600 ring-slate-200 dark:bg-slate-900/40 dark:text-slate-300 dark:ring-slate-800"
              ].join(" ")}
            >
              <FiCalendar />
              {formatDue(todo.dueDate)}
              {overdue ? " • Overdue" : ""}
            </span>

            <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-600 dark:bg-slate-900/50 dark:text-slate-300">
              {todo.completed ? "Completed" : "Active"}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onToggleComplete(todo)}
            aria-label="Toggle complete"
          >
            {todo.completed ? "Undo" : "Done"}
          </Button>
          <button
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-900/40 dark:hover:text-slate-100"
            onClick={() => onEdit(todo)}
            aria-label="Edit"
          >
            <FiEdit2 />
          </button>
          <button
            className="rounded-xl p-2 text-rose-500 transition hover:bg-rose-50 hover:text-rose-700 dark:hover:bg-rose-950/30 dark:hover:text-rose-200"
            onClick={() => onDelete(todo)}
            aria-label="Delete"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

