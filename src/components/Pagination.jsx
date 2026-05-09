import React from "react";
import { Button } from "./Button";

export function Pagination({ page, totalPages, onPageChange }) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <div className="text-xs text-slate-500 dark:text-slate-400">
        Page <span className="font-semibold text-slate-700 dark:text-slate-200">{page}</span> of{" "}
        <span className="font-semibold text-slate-700 dark:text-slate-200">{totalPages}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" disabled={!canPrev} onClick={() => onPageChange(page - 1)}>
          Prev
        </Button>
        <Button variant="secondary" size="sm" disabled={!canNext} onClick={() => onPageChange(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}

