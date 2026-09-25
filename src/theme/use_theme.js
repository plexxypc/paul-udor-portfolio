import { useContext } from "react";
import { theme_context } from "./theme_context";

/**
 * Access the active theme and toggle. Named `useTheme` (not snake_case) because
 * React's hook lint rules only recognise the `useX` naming pattern.
 *
 * @returns {import("./theme_context").theme_context_value} Theme state.
 */
export function useTheme() {
  const context_value = useContext(theme_context);
  if (!context_value) {
    throw new Error("useTheme must be used inside <ThemeProvider>.");
  }
  return context_value;
}
