import { Link } from "react-router-dom";
import { profile } from "../data/profileData";
import DownloadIcon from "./DownloadIcon";
import HeroBackground from "./HeroBackground";
import SpecPanel from "./SpecPanel";

/**
 * Join list values with a middle dot, the separator used for data readouts.
 *
 * @param {string[]} values - Values to join.
 * @returns {string} Joined string.
 */
function join_values(values) {
  return values.join(" · ");
}

/**
 * Compact resume download / view buttons for the profile.config readout.
 *
 * @returns {import("react").JSX.Element} Button group.
 */
function ResumeActions() {
  return (
    <span className="spec_actions">
      <a
        className="button button_small"
        href={profile.resume_url}
        download={profile.resume_file_name}
        aria-label="Download resume (PDF)"
      >
        <DownloadIcon size={14} />
        Download
      </a>
      <a
        className="button button_small"
        href={profile.resume_url}
        target="_blank"
        rel="noreferrer"
        aria-label="View resume in browser (opens in a new tab)"
      >
        View in browser &#8599;
      </a>
    </span>
  );
}

/**
 * Homepage hero: name/tagline, title, bio, two entry points (hire vs. commission),
 * and a config-style profile readout. Vanta NET animates behind it.
 *
 * @returns {import("react").JSX.Element} Hero section.
 */
export default function HeroSection() {
  const heading_text = profile.tagline || profile.name;

  /** @type {import("./SpecPanel").spec_row[]} */
  const spec_rows = [
    { key: "focus", value: join_values(profile.focus_areas) },
    { key: "tools", value: join_values(profile.tools) },
    ...(profile.location ? [{ key: "location", value: profile.location }] : []),
    { key: "open_to", value: join_values(profile.open_to), is_signal: true },
    ...(profile.resume_url ? [{ key: "resume", value: <ResumeActions /> }] : []),
    { key: "contact", value: <a href={`mailto:${profile.email}`}>{profile.email}</a> },
  ];

  return (
    <section className="hero" aria-labelledby="hero_heading">
      <HeroBackground />
      <div className="hero_scrim" aria-hidden="true" />
      <div className="container hero_inner">
        <div className="hero_copy">
          <h1 id="hero_heading" className="hero_heading">
            {heading_text}
          </h1>
          <p className="hero_title">
            {profile.tagline ? `${profile.name} — ${profile.title}` : profile.title}
          </p>
          <p className="hero_bio">{profile.bio}</p>
          <div className="hero_actions">
            <Link className="button button_primary" to="/?intent=hire#contact">
              Hire me for a role
            </Link>
            <Link className="button" to="/?intent=build#contact">
              Commission an automation build
            </Link>
          </div>
        </div>
        <SpecPanel title="profile.config" rows={spec_rows} accessible_label="Profile summary" />
      </div>
      <div className="container">
        <span className="node_port node_port_output" aria-hidden="true" />
      </div>
    </section>
  );
}
