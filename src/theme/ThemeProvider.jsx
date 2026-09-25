import { useCallback, useEffect, useMemo, useState } from "react";
import { THEME_STORAGE_KEY, theme_context } from "./theme_context";

const LIGHT_SCHEME_QUERY = "(prefers-color-scheme: light)";

/**
 * Read the theme that index.html's inline script applied before first paint.
 *
 * @returns {import("./theme_context").theme_name} Initial theme.
 */
function read_initial_theme() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/**
 * Whether the visitor has previously picked a theme with the toggle.
 *
 * @returns {boolean} True when a stored choice exists.
 */
function has_stored_theme() {
  try {
    const stored_theme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored_theme === "light" || stored_theme === "dark";
  } catch {
    return false;
  }
}

/**
 * Persist the visitor's explicit theme choice.
 *
 * @param {import("./theme_context").theme_name} theme - Theme to store.
 * @returns {void}
 */
function store_theme(theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode); the toggle still works per session.
  }
}

/**
 * Provides the active theme. Follows the OS setting until the visitor uses
 * the toggle, then remembers their choice.
 *
 * @param {{ children: import("react").ReactNode }} props - Component props.
 * @returns {import("react").JSX.Element} Provider element.
 */
export default function ThemeProvider({ children }) {
  const [theme, set_theme] = useState(read_initial_theme);
  const [follows_system, set_follows_system] = useState(() => !has_stored_theme());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (!follows_system) return undefined;
    const media_query = window.matchMedia(LIGHT_SCHEME_QUERY);
    /** @param {MediaQueryListEvent} event */
    const handle_scheme_change = (event) => set_theme(event.matches ? "light" : "dark");
    media_query.addEventListener("change", handle_scheme_change);
    return () => media_query.removeEventListener("change", handle_scheme_change);
  }, [follows_system]);

  const toggle_theme = useCallback(() => {
    const next_theme = theme === "dark" ? "light" : "dark";
    store_theme(next_theme);
    set_follows_system(false);
    set_theme(next_theme);
  }, [theme]);

  const context_value = useMemo(() => ({ theme, toggle_theme }), [theme, toggle_theme]);

  return <theme_context.Provider value={context_value}>{children}</theme_context.Provider>;
}
