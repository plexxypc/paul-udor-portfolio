import { Link, useLocation } from "react-router-dom";
import { profile } from "../data/profileData";
import ThemeToggle from "./ThemeToggle";

/**
 * @typedef {Object} nav_item
 * @property {string} label - Link text.
 * @property {string} to - Router destination.
 * @property {string | null} active_prefix - Pathname prefix that marks the link as current.
 */

/** @type {nav_item[]} */
const NAV_ITEMS = [
  { label: "Work", to: "/#work", active_prefix: "/work" },
  { label: "Writing", to: "/blog", active_prefix: "/blog" },
  ...(profile.resume_url ? [{ label: "Resume", to: "/#resume", active_prefix: null }] : []),
  { label: "Contact", to: "/#contact", active_prefix: null },
];

/**
 * Site-wide header with brand, primary navigation, and theme toggle.
 *
 * @returns {import("react").JSX.Element} Header element.
 */
export default function SiteHeader() {
  const { pathname } = useLocation();

  return (
    <header className="site_header">
      <div className="container site_header_inner">
        <Link to="/" className="brand">
          <span className="status_light" aria-hidden="true" />
          {profile.name}
        </Link>
        <nav aria-label="Primary">
          <ul className="site_nav">
            {NAV_ITEMS.map((item) => {
              const is_current = item.active_prefix !== null && pathname.startsWith(item.active_prefix);
              return (
                <li key={item.label}>
                  <Link to={item.to} className="nav_link" aria-current={is_current ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
