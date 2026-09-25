import { useTheme } from "../theme/use_theme";

/**
 * Sun icon, shown in dark mode (action: switch to light).
 *
 * @returns {import("react").JSX.Element} SVG element.
 */
function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

/**
 * Moon icon, shown in light mode (action: switch to dark).
 *
 * @returns {import("react").JSX.Element} SVG element.
 */
function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

/**
 * Button that switches between dark and light themes.
 *
 * @returns {import("react").JSX.Element} Toggle button.
 */
export default function ThemeToggle() {
  const { theme, toggle_theme } = useTheme();
  const next_theme = theme === "dark" ? "light" : "dark";
  const action_label = `Switch to ${next_theme} theme`;

  return (
    <button type="button" className="theme_toggle" onClick={toggle_theme} aria-label={action_label} title={action_label}>
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
