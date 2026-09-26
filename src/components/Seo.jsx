import { Helmet } from "react-helmet-async";
import { profile, to_absolute_url } from "../data/profileData";
import { serialize_json_ld } from "../utils/structured_data";

/**
 * Per-route <head> tags: title, description, canonical URL, Open Graph,
 * Twitter card, and optional JSON-LD. Replaces the static defaults in
 * index.html once rendered.
 *
 * @param {Object} props - Component props.
 * @param {string | null} props.title - Page title, or null for the homepage's full site title.
 * @param {string} props.description - Meta description (aim for under ~160 characters).
 * @param {string} props.path - Site-relative path for the canonical and og:url.
 * @param {"website" | "article" | "profile"} [props.og_type] - Open Graph type.
 * @param {boolean} [props.no_index] - Ask crawlers not to index this page.
 * @param {Record<string, unknown>[]} [props.json_ld] - Page-specific schema.org objects.
 * @returns {import("react").JSX.Element} Helmet element.
 */
export default function Seo({ title, description, path, og_type = "website", no_index = false, json_ld = [] }) {
  const full_title = title ? `${title} — ${profile.name}` : `${profile.name} — ${profile.title}`;
  const canonical_url = to_absolute_url(path);

  return (
    <Helmet>
      <title>{full_title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical_url} />
      {no_index ? <meta name="robots" content="noindex" /> : null}

      <meta property="og:site_name" content={profile.name} />
      <meta property="og:title" content={full_title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={og_type} />
      <meta property="og:url" content={canonical_url} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={full_title} />
      <meta name="twitter:description" content={description} />

      {json_ld.map((schema) => (
        <script key={String(schema["@type"])} type="application/ld+json">
          {serialize_json_ld(schema)}
        </script>
      ))}
    </Helmet>
  );
}
