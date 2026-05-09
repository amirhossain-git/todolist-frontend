import React from "react";
import { FiPlus } from "react-icons/fi";
import { Button } from "./Button";
import { Input } from "./Input";
import { Textarea } from "./Textarea";

export function TodoForm({ onSubmit, disabled }) {
  const [title, setTitle] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      title,
      notes: notes || "",
      dueDate: dueDate ? new Date(dueDate).toISOString() : null
    };
    await onSubmit(payload);
    setTitle("");
    setNotes("");
    setDueDate("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200/70 bg-white/70 p-5 shadow-sm dark:border-slate-800/70 dark:bg-slate-950/30"
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Input
            label="Task title"
            placeholder="e.g. Prepare project demo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={disabled}
          />
        </div>
        <div>
          <Input
            label="Due date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>

      <div className="mt-4">
        <Textarea
          label="Notes (optional)"
          placeholder="Add context, subtasks, or links…"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Tip: Use search + filters to stay focused.
        </div>
        <Button type="submit" disabled={disabled || !title.trim()}>
          <FiPlus />
          Add todo
        </Button>
      </div>
    </form>
  );
}

