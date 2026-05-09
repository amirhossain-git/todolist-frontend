import React from "react";

const ThemeContext = React.createContext(null);

function getInitialTheme() {
  const stored = localStorage.getItem("todoflow.theme");
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(() => getInitialTheme());

  React.useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // Apply to both html + body for maximum compatibility with dark selectors.
    const targets = [html, body].filter(Boolean);
    for (const el of targets) {
      if (theme === "dark") el.classList.add("dark");
      else el.classList.remove("dark");
    }

    // Helps native controls match theme (inputs, scrollbars on some browsers).
    html.style.colorScheme = theme;
    localStorage.setItem("todoflow.theme", theme);
  }, [theme]);

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
      toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark"))
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

