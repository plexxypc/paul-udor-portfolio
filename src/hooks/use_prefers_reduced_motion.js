import { useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Subscribe to changes of the reduced-motion media query.
 *
 * @param {() => void} on_change - Called when the preference changes.
 * @returns {() => void} Unsubscribe function.
 */
function subscribe_to_motion_preference(on_change) {
  const media_query = window.matchMedia(REDUCED_MOTION_QUERY);
  media_query.addEventListener("change", on_change);
  return () => media_query.removeEventListener("change", on_change);
}

/**
 * Current reduced-motion preference.
 *
 * @returns {boolean} True when the visitor asked for reduced motion.
 */
function read_motion_preference() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/**
 * Live `prefers-reduced-motion` value. Defaults to reduced when it cannot be read.
 *
 * @returns {boolean} True when motion should be minimised.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe_to_motion_preference, read_motion_preference, () => true);
}
