/**
 * Previous website work. Each entry becomes a screenshot card that opens the
 * live site. Array order is display order; entries with `is_featured: true`
 * also appear on the homepage.
 */

import caldera_stores_image from "../assets/work/caldera-stores.jpg";
import emporium_de_vogue_image from "../assets/work/emporium-de-vogue.jpg";
import intelfort_image from "../assets/work/intelfort.png";
import jimi_image from "../assets/work/jimi.png";
import veracre8_image from "../assets/work/veracre8.jpg";

/**
 * @typedef {"developed" | "assisted"} website_role
 */

/**
 * @typedef {Object} website
 * @property {string} id - Unique key.
 * @property {string} name - Site or client name.
 * @property {string} url - Live URL.
 * @property {string} category - Short industry label.
 * @property {string} description - One-sentence summary.
 * @property {website_role} role - "developed" (lead developer) or "assisted" (supporting developer).
 * @property {string[]} stack - Platform / tools.
 * @property {string} image - Imported screenshot URL.
 * @property {number} image_width - Intrinsic screenshot width, to prevent layout shift.
 * @property {number} image_height - Intrinsic screenshot height.
 * @property {boolean} is_featured - Show on the homepage.
 */

/** @type {website[]} */
export const websites = [
  {
    id: "veracre8",
    name: "VeraCre8 Media",
    url: "https://veracre8.com/",
    category: "Marketing agency",
    description:
      "Site for a marketing agency that combines creative storytelling with performance marketing, from content creation to campaign optimisation.",
    role: "developed",
    stack: ["Vite", "React"],
    image: veracre8_image,
    image_width: 1024,
    image_height: 496,
    is_featured: true,
  },
  {
    id: "jimi",
    name: "Jimi",
    url: "https://jimiportfolio.vercel.app/",
    category: "Motion design portfolio",
    description: "Portfolio site for Jimi, an independent motion designer and art director.",
    role: "developed",
    stack: ["Vite", "React"],
    image: jimi_image,
    image_width: 1024,
    image_height: 498,
    is_featured: true,
  },
  {
    id: "emporium-de-vogue",
    name: "Emporium De Vogue",
    url: "https://emporiumdevogue.com/",
    category: "Fashion · E-commerce",
    description:
      "An e-commerce store for made-to-order female garments that celebrate African culture, class, and individuality, using textiles like Akwete, Aso-Oke, and Adire.",
    role: "assisted",
    stack: ["WordPress", "Elementor", "WooCommerce"],
    image: emporium_de_vogue_image,
    image_width: 1024,
    image_height: 499,
    is_featured: true,
  },
  {
    id: "intelfort",
    name: "Intelfort",
    url: "https://intelfortng.com/",
    category: "Data analytics",
    description:
      "A Lagos-based data analytics company handling big data for various institutions in Nigeria and overseas.",
    role: "developed",
    stack: ["Custom build"],
    image: intelfort_image,
    image_width: 1024,
    image_height: 506,
    is_featured: false,
  },
  {
    id: "caldera-stores",
    name: "Caldera Stores",
    url: "https://calderastores.com/",
    category: "Phone repair · Accessories",
    description:
      "A phone repair and accessory shop located across different cities in the South-Western and Northern parts of Nigeria.",
    role: "assisted",
    stack: ["Custom build"],
    image: caldera_stores_image,
    image_width: 1024,
    image_height: 503,
    is_featured: false,
  },
];

/** @type {website[]} */
export const featured_websites = websites.filter((site) => site.is_featured);
