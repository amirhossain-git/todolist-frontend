import React from "react";
import toast from "react-hot-toast";

import { api } from "../lib/api";
import { loadTodosBackup, saveTodosBackup } from "../lib/storage";
import { useDebounce } from "./useDebounce";

const DEFAULT_LIMIT = 10;

export function useTodos() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(DEFAULT_LIMIT);
  const [total, setTotal] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(1);

  const [status, setStatus] = React.useState("all"); // all | active | completed
  const [sort, setSort] = React.useState("newest"); // newest | oldest
  const [q, setQ] = React.useState("");
  const qDebounced = useDebounce(q, 300);

  const refresh = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/todos", {
        params: {
          page,
          limit,
          status,
          sort,
          q: qDebounced || undefined
        }
      });

      setItems(res.data.items || []);
      setTotal(res.data.total || 0);
      setTotalPages(res.data.totalPages || 1);

      saveTodosBackup(res.data.items || []);
    } catch (err) {
      const backup = loadTodosBackup();
      if (backup?.todos?.length) {
        setItems(backup.todos);
        toast.error(`${err.message} — showing local backup`);
      } else {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [page, limit, status, sort, qDebounced]);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  async function addTodo(payload) {
    setSaving(true);
    try {
      await api.post("/api/todos", payload);
      toast.success("Todo added");
      setPage(1);
      await refresh();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function updateTodo(id, patch) {
    setSaving(true);
    try {
      await api.put(`/api/todos/${id}`, patch);
      toast.success("Todo updated");
      await refresh();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteTodo(id) {
    setSaving(true);
    try {
      await api.delete(`/api/todos/${id}`);
      toast.success("Todo deleted");

      // If we deleted the last item on a page, nudge back a page.
      if (items.length === 1 && page > 1) setPage((p) => p - 1);
      await refresh();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  return {
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

    refresh,
    addTodo,
    updateTodo,
    deleteTodo
  };
}

