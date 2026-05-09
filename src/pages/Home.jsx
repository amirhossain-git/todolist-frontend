import React from "react";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import { useTodos } from "../hooks/useTodos";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { TodoForm } from "../components/TodoForm";
import { Toolbar } from "../components/Toolbar";
import { Spinner } from "../components/Spinner";
import { EmptyState } from "../components/EmptyState";
import { TodoCard } from "../components/TodoCard";
import { Pagination } from "../components/Pagination";
import { Modal } from "../components/Modal";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";
import { toDateInputValue } from "../lib/date";

export default function Home() {
  const todos = useTodos();
  const {
    items,
    loading,
    saving,
    page,
    setPage,
    limit,
    setLimit,
    total,
    totalPages,
    status,
    setStatus,
    sort,
    setSort,
    q,
    setQ,
    addTodo,
    updateTodo,
    deleteTodo
  } = todos;

  const [editOpen, setEditOpen] = React.useState(false);
  const [editing, setEditing] = React.useState(null);

  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [toDelete, setToDelete] = React.useState(null);

  function openEdit(todo) {
    setEditing({
      _id: todo._id,
      title: todo.title || "",
      notes: todo.notes || "",
      dueDate: toDateInputValue(todo.dueDate),
      completed: Boolean(todo.completed)
    });
    setEditOpen(true);
  }

  async function saveEdit() {
    if (!editing?.title?.trim()) {
      toast.error("Title is required");
      return;
    }
    await updateTodo(editing._id, {
      title: editing.title,
      notes: editing.notes || "",
      dueDate: editing.dueDate ? new Date(editing.dueDate).toISOString() : null,
      completed: editing.completed
    });
    setEditOpen(false);
    setEditing(null);
  }

  function openConfirmDelete(todo) {
    setToDelete(todo);
    setConfirmOpen(true);
  }

  async function confirmDelete() {
    if (!toDelete?._id) return;
    await deleteTodo(toDelete._id);
    setConfirmOpen(false);
    setToDelete(null);
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <section className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white via-white to-sky-50 p-6 shadow-sm dark:border-slate-800/70 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />
          <div className="relative">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Dashboard</div>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Your tasks, beautifully organized
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Add todos with due dates, search instantly, filter by status, and stay productive with a clean,
              modern UI.
            </p>
          </div>
        </section>

        <section className="mt-6">
          <TodoForm onSubmit={addTodo} disabled={saving} />
        </section>

        <section className="mt-6">
          <Toolbar
            q={q}
            setQ={(v) => {
              setQ(v);
              setPage(1);
            }}
            status={status}
            setStatus={(v) => {
              setStatus(v);
              setPage(1);
            }}
            sort={sort}
            setSort={(v) => {
              setSort(v);
              setPage(1);
            }}
            limit={limit}
            setLimit={(v) => {
              setLimit(v);
              setPage(1);
            }}
            total={total}
          />
        </section>

        <section className="mt-6">
          {loading ? (
            <Spinner label="Loading your todos..." />
          ) : items.length === 0 ? (
            <EmptyState
              title="Nothing here (yet)"
              subtitle="Add a task above, or adjust your search and filters."
            />
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <AnimatePresence initial={false}>
                  {items.map((t) => (
                    <TodoCard
                      key={t._id}
                      todo={t}
                      onToggleComplete={(todo) =>
                        updateTodo(todo._id, { completed: !todo.completed })
                      }
                      onEdit={openEdit}
                      onDelete={openConfirmDelete}
                    />
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-6">
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
              </div>
            </>
          )}
        </section>

        <Footer />
      </main>

      <Modal open={editOpen} title="Edit todo" onClose={() => setEditOpen(false)}>
        {editing ? (
          <div className="space-y-4">
            <Input
              label="Title"
              value={editing.title}
              onChange={(e) => setEditing((s) => ({ ...s, title: e.target.value }))}
            />
            <Input
              label="Due date"
              type="date"
              value={editing.dueDate}
              onChange={(e) => setEditing((s) => ({ ...s, dueDate: e.target.value }))}
              hint="Leave empty for no due date."
            />
            <Textarea
              label="Notes"
              value={editing.notes}
              onChange={(e) => setEditing((s) => ({ ...s, notes: e.target.value }))}
            />
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
              <input
                type="checkbox"
                checked={editing.completed}
                onChange={(e) => setEditing((s) => ({ ...s, completed: e.target.checked }))}
              />
              Mark as completed
            </label>
            <div className="flex items-center justify-end gap-2">
              <Button variant="secondary" onClick={() => setEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveEdit} disabled={saving}>
                Save changes
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal open={confirmOpen} title="Delete todo?" onClose={() => setConfirmOpen(false)}>
        <div className="space-y-4">
          <div className="text-sm text-slate-600 dark:text-slate-300">
            This action can’t be undone. Are you sure you want to delete{" "}
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {toDelete?.title}
            </span>
            ?
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete} disabled={saving}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

