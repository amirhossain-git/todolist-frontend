const KEY = "todoflow.todos.backup.v1";

export function saveTodosBackup(todos) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ todos, savedAt: Date.now() }));
  } catch {
    // ignore localStorage failures (private mode etc.)
  }
}

export function loadTodosBackup() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.todos)) return null;
    return parsed;
  } catch {
    return null;
  }
}

