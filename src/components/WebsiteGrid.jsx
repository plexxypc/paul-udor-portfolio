import WebsiteCard from "./WebsiteCard";

/**
 * Responsive grid of website cards.
 *
 * @param {{ sites: import("../data/websitesData").website[] }} props - Component props.
 * @returns {import("react").JSX.Element} List element.
 */
export default function WebsiteGrid({ sites }) {
  return (
    <ul className="site_grid">
      {sites.map((site) => (
        <li key={site.id}>
          <WebsiteCard site={site} />
        </li>
      ))}
    </ul>
  );
}
