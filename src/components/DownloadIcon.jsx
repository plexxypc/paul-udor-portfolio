/**
 * Download arrow icon used on resume buttons.
 *
 * @param {{ size?: number }} props - Component props.
 * @returns {import("react").JSX.Element} SVG element.
 */
export default function DownloadIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </svg>
  );
}
