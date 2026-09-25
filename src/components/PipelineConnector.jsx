/**
 * A hairline edge between two section "nodes", like a connection on an
 * automation canvas. Starts at an output port and ends at the next section's
 * input port (rendered by NodeHeader).
 *
 * @param {{ size?: "default" | "compact" }} props - Component props.
 * @returns {import("react").JSX.Element} Decorative connector.
 */
export default function PipelineConnector({ size = "default" }) {
  return <div className={`pipeline_connector pipeline_connector_${size}`} aria-hidden="true" />;
}
