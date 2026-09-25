import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scroll to the top on route change, or to the `#hash` target when present,
 * moving focus there so keyboard and screen-reader users land in the right place.
 * Scrolling is instant on purpose: the hero background is the only motion.
 *
 * @returns {null} Renders nothing.
 */
export default function ScrollManager() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target_element = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target_element) {
        target_element.scrollIntoView({ block: "start" });
        target_element.focus({ preventScroll: true });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, search, hash]);

  return null;
}
