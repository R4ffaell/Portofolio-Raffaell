"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

const STORAGE_KEY = "theme";

function savedTheme(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // private mode / blocked storage
  }
}

/**
 * Light/dark switch. The initial class is set by the inline script in
 * layout.tsx; icons swap with CSS (`dark:`), so nothing here depends on
 * React state and there is no hydration mismatch.
 */
export function ThemeToggle() {
  // Follow OS theme changes until the visitor picks a theme explicitly.
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (savedTheme()) return;
      document.documentElement.classList.toggle("dark", e.matches);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      /* theme still applies for this visit */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-fg/10 hover:text-fg"
    >
      <Sun size={16} aria-hidden="true" className="hidden dark:block" />
      <Moon size={16} aria-hidden="true" className="dark:hidden" />
    </button>
  );
}
