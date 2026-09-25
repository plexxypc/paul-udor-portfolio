import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/use_prefers_reduced_motion";
import { useTheme } from "../theme/use_theme";

/**
 * @typedef {Object} net_colors
 * @property {number} line_color - Hex colour for the network lines.
 * @property {number} background_color - Hex colour behind the lines.
 */

/**
 * Mirrors --accent and --bg in tokens.css for each theme.
 *
 * @type {Record<import("../theme/theme_context").theme_name, net_colors>}
 */
const NET_COLORS_BY_THEME = {
  dark: { line_color: 0xf2a94f, background_color: 0x14171c },
  light: { line_color: 0xb86e12, background_color: 0xeef1f5 },
};

/**
 * @typedef {{ destroy: () => void }} vanta_effect
 * @typedef {(options: Record<string, unknown>) => vanta_effect} net_factory
 */

/**
 * Vanta ships a UMD bundle, and depending on the bundler's CommonJS interop the
 * factory arrives as the module, `.default`, or `.default.default`.
 *
 * @param {unknown} module_value - Result of the dynamic import.
 * @returns {net_factory | null} The NET factory, if found.
 */
function resolve_net_factory(module_value) {
  let candidate = module_value;
  for (let depth = 0; depth < 3; depth += 1) {
    if (typeof candidate === "function") return /** @type {net_factory} */ (candidate);
    candidate = candidate && typeof candidate === "object" ? candidate.default : undefined;
  }
  return null;
}

/**
 * The site's single motion moment: a Vanta NET effect behind the hero,
 * recoloured per theme. three.js and Vanta load lazily so they never block
 * first paint, and nothing loads at all under prefers-reduced-motion.
 *
 * @returns {import("react").JSX.Element} Decorative canvas container.
 */
export default function HeroBackground() {
  const container_ref = useRef(/** @type {HTMLDivElement | null} */ (null));
  const { theme } = useTheme();
  const prefers_reduced_motion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefers_reduced_motion || !container_ref.current) return undefined;

    let is_cancelled = false;
    /** @type {vanta_effect | null} */
    let net_effect = null;

    Promise.all([import("three"), import("vanta/dist/vanta.net.min")])
      .then(([three_module, net_module]) => {
        const create_net = resolve_net_factory(net_module);
        if (is_cancelled || !create_net || !container_ref.current) return;
        const colors = NET_COLORS_BY_THEME[theme];
        net_effect = create_net({
          el: container_ref.current,
          THREE: three_module,
          color: colors.line_color,
          backgroundColor: colors.background_color,
          points: 9,
          maxDistance: 22,
          spacing: 18,
          showDots: false,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          scale: 1,
          scaleMobile: 1,
        });
      })
      .catch(() => {
        // Decorative only: if WebGL or the chunk fails, the static grid remains.
      });

    return () => {
      is_cancelled = true;
      net_effect?.destroy();
    };
  }, [theme, prefers_reduced_motion]);

  return <div ref={container_ref} className="hero_canvas" aria-hidden="true" />;
}
