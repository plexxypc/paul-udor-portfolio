/**
 * Section heading styled as a node's header: an input port on the left, the
 * heading, and an optional data readout on the right.
 *
 * @param {Object} props - Component props.
 * @param {string} props.heading_id - id for the heading, used by aria-labelledby.
 * @param {string} props.title - Heading text.
 * @param {string} [props.meta] - Optional data readout, e.g. a count.
 * @param {2 | 3} [props.heading_level] - Heading level.
 * @returns {import("react").JSX.Element} Header element.
 */
export default function NodeHeader({ heading_id, title, meta, heading_level = 2 }) {
  const HeadingTag = `h${heading_level}`;

  return (
    <div className="node_header">
      <span className="node_port" aria-hidden="true" />
      <HeadingTag id={heading_id} className="node_title">
        {title}
      </HeadingTag>
      {meta ? <span className="node_meta mono">{meta}</span> : null}
    </div>
  );
}
