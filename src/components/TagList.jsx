/**
 * Monospace tag chips for data such as stacks and topics.
 *
 * @param {Object} props - Component props.
 * @param {string[]} props.tags - Tags to show.
 * @param {string} props.label - Accessible name for the list.
 * @returns {import("react").JSX.Element | null} List, or nothing when empty.
 */
export default function TagList({ tags, label }) {
  if (!tags.length) return null;

  return (
    <ul className="tag_list" aria-label={label}>
      {tags.map((tag) => (
        <li key={tag} className="tag mono">
          {tag}
        </li>
      ))}
    </ul>
  );
}
