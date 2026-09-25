import { profile } from "../data/profileData";

/**
 * Site-wide footer with copyright, email, and social links.
 *
 * @returns {import("react").JSX.Element} Footer element.
 */
export default function SiteFooter() {
  const current_year = new Date().getFullYear();

  return (
    <footer className="site_footer">
      <div className="container site_footer_inner">
        <p className="site_footer_copy">
          &copy; {current_year} {profile.name}
        </p>
        <ul className="site_footer_links">
          <li>
            <a href={`mailto:${profile.email}`}>Email</a>
          </li>
          {profile.socials.map((social) => (
            <li key={social.label}>
              <a href={social.url} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
