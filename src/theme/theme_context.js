import { createContext } from "react";

/** @typedef {"dark" | "light"} theme_name */

/**
 * @typedef {Object} theme_context_value
 * @property {theme_name} theme - Active theme.
 * @property {() => void} toggle_theme - Switch theme and remember the choice.
 */

/** Must match the key read by the inline script in index.html. */
export const THEME_STORAGE_KEY = "theme";

/** @type {import("react").Context<theme_context_value | null>} */
export const theme_context = createContext(null);
