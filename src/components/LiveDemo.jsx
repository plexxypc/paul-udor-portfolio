/**
 * Host name for display, falling back to the raw URL if it can't be parsed.
 *
 * @param {string} url - Demo URL.
 * @returns {string} Host name.
 */
function get_display_host(url) {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

/**
 * Optional interactive demo for a case study: an embedded iframe framed like a
 * console window, or a plain link when embedding is turned off.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.demo_url] - Demo URL; nothing renders without it.
 * @param {boolean} [props.demo_embed] - Embed in an iframe instead of linking.
 * @param {string} props.project_title - Used for the iframe's accessible title.
 * @returns {import("react").JSX.Element | null} Demo block, or nothing.
 */
export default function LiveDemo({ demo_url, demo_embed = false, project_title }) {
  if (!demo_url) return null;

  const display_host = get_display_host(demo_url);

  if (!demo_embed) {
    return (
      <p className="live_demo_link">
        <a className="button" href={demo_url} target="_blank" rel="noreferrer">
          Open the live demo &#8599;
        </a>
      </p>
    );
  }

  return (
    <figure className="live_demo">
      <figcaption className="live_demo_bar">
        <span className="status_light" aria-hidden="true" />
        <span className="mono">live demo · {display_host}</span>
        <a className="live_demo_open" href={demo_url} target="_blank" rel="noreferrer">
          Open in new tab &#8599;
        </a>
      </figcaption>
      <iframe
        className="live_demo_frame"
        src={demo_url}
        title={`${project_title} live demo`}
        loading="lazy"
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
      />
    </figure>
  );
}
