/**
 * @typedef {Object} spec_row
 * @property {string} key - Config-style key, e.g. `stack`.
 * @property {import("react").ReactNode} value - Value to display.
 * @property {boolean} [is_signal] - Prefix the value with the amber status light.
 */

/**
 * Config-readout panel: a titled key/value list rendered as data.
 *
 * @param {Object} props - Component props.
 * @param {string} props.title - Panel label, e.g. `profile.config`.
 * @param {spec_row[]} props.rows - Rows to display.
 * @param {string} props.accessible_label - Accessible name for the panel.
 * @returns {import("react").JSX.Element} Panel element.
 */
export default function SpecPanel({ title, rows, accessible_label }) {
  return (
    <aside className="spec_panel" aria-label={accessible_label}>
      <p className="spec_panel_title mono" aria-hidden="true">
        {title}
      </p>
      <dl className="spec_rows">
        {rows.map((row) => (
          <div key={row.key} className="spec_row">
            <dt className="spec_key mono">{row.key}</dt>
            <dd className="spec_value mono">
              {row.is_signal ? <span className="status_light" aria-hidden="true" /> : null}
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
