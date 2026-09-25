import TagList from "./TagList";

/** @type {Record<import("../data/websitesData").website_role, string>} */
const ROLE_LABELS = {
  developed: "developer",
  assisted: "assisting developer",
};

/**
 * Host name for the frame's URL bar, without a leading "www.".
 *
 * @param {string} url - Site URL.
 * @returns {string} Display host.
 */
function get_display_host(url) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/**
 * Screenshot card for a previous website, framed like a browser window.
 * The name link is stretched over the card and opens the live site.
 *
 * @param {{ site: import("../data/websitesData").website }} props - Component props.
 * @returns {import("react").JSX.Element} Card element.
 */
export default function WebsiteCard({ site }) {
  const display_host = get_display_host(site.url);

  return (
    <article className="site_card">
      <div className="site_frame">
        <div className="site_frame_bar" aria-hidden="true">
          <span className="site_frame_url mono">{display_host}</span>
          <span className="site_frame_open">&#8599;</span>
        </div>
        <img
          className="site_frame_image"
          src={site.image}
          alt={`Homepage of ${site.name}`}
          width={site.image_width}
          height={site.image_height}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="site_card_body">
        <h3 className="site_card_title">
          <a href={site.url} target="_blank" rel="noreferrer" className="stretched_link">
            {site.name}
            <span className="visually_hidden"> (opens in a new tab)</span>
          </a>
        </h3>
        <p className="site_card_meta mono">
          {site.category} · role: {ROLE_LABELS[site.role]}
        </p>
        <p className="site_card_description">{site.description}</p>
        <TagList tags={site.stack} label={`${site.name} stack`} />
      </div>
    </article>
  );
}
