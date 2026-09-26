/**
 * schema.org JSON-LD builders. Shared by vite.config.js (site-wide Person
 * schema baked into index.html) and page components (FAQPage on About).
 */

import { profile, to_absolute_url } from "../data/profileData.js";

/**
 * Person schema for the site owner.
 *
 * @returns {Record<string, unknown>} JSON-LD object.
 */
export function build_person_schema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: profile.bio,
    url: to_absolute_url("/"),
    email: `mailto:${profile.email}`,
    sameAs: profile.socials.map((social) => social.url),
    knowsAbout: profile.skills.flatMap((group) => group.items),
  };
}

/**
 * FAQPage schema from question/answer pairs.
 *
 * @param {import("../data/faqData.js").faq_entry[]} entries - FAQ entries.
 * @returns {Record<string, unknown>} JSON-LD object.
 */
export function build_faq_schema(entries) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}

/**
 * Serialise JSON-LD for a <script> tag. `<` is escaped so content can never
 * close the script element early.
 *
 * @param {Record<string, unknown>} schema - JSON-LD object.
 * @returns {string} Safe JSON string.
 */
export function serialize_json_ld(schema) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
