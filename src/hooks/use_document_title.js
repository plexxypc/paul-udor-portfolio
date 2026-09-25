import { useEffect } from "react";
import { profile } from "../data/profileData";

/**
 * Set the browser tab title as `<page_title> — <name>`, or the full site title
 * when no page title is given.
 *
 * @param {string | null} page_title - Page-specific title, or null for the homepage.
 * @returns {void}
 */
export function useDocumentTitle(page_title) {
  useEffect(() => {
    document.title = page_title
      ? `${page_title} — ${profile.name}`
      : `${profile.name} — ${profile.title}`;
  }, [page_title]);
}
