/**
 * Markdown frontmatter parsing and post normalisation. Pure functions with no
 * Vite- or Node-specific APIs, so both the browser bundle (utils/blog.js) and
 * the build-time sitemap generator (vite.config.js) can use them.
 */

/**
 * @typedef {Object} blog_post
 * @property {string} slug - File name without the .md extension.
 * @property {string} title - Post title.
 * @property {string} date - ISO date (YYYY-MM-DD).
 * @property {string} excerpt - Short summary for listings.
 * @property {string[]} tags - Topic tags.
 * @property {string} content - Markdown body without frontmatter.
 */

/**
 * @typedef {Object} parsed_markdown
 * @property {Record<string, string | string[]>} data - Frontmatter key/value pairs.
 * @property {string} content - Markdown body.
 */

const FRONTMATTER_PATTERN = /^\uFEFF?---\r?\n([\s\S]*?)\r?\n---[^\S\r\n]*(?:\r?\n|$)([\s\S]*)$/;

/**
 * Remove one pair of matching surrounding quotes, if present.
 *
 * @param {string} value - Raw value.
 * @returns {string} Unquoted, trimmed value.
 */
function strip_quotes(value) {
  const trimmed_value = value.trim();
  const first_char = trimmed_value[0];
  const last_char = trimmed_value[trimmed_value.length - 1];
  const is_quoted =
    trimmed_value.length >= 2 && first_char === last_char && (first_char === '"' || first_char === "'");
  return is_quoted ? trimmed_value.slice(1, -1) : trimmed_value;
}

/**
 * Parse a single frontmatter value. Supports plain/quoted strings and
 * inline arrays like `[n8n, "automation"]`.
 *
 * @param {string} raw_value - Text after the first colon.
 * @returns {string | string[]} Parsed value.
 */
function parse_frontmatter_value(raw_value) {
  const trimmed_value = raw_value.trim();
  if (trimmed_value.startsWith("[") && trimmed_value.endsWith("]")) {
    return trimmed_value
      .slice(1, -1)
      .split(",")
      .map(strip_quotes)
      .filter(Boolean);
  }
  return strip_quotes(trimmed_value);
}

/**
 * Split a markdown document into frontmatter data and body.
 * Handles both LF and CRLF line endings.
 *
 * @param {string} raw_text - Full file contents.
 * @returns {parsed_markdown} Frontmatter and body.
 */
export function parse_frontmatter(raw_text) {
  const match = raw_text.match(FRONTMATTER_PATTERN);
  if (!match) {
    return { data: {}, content: raw_text.trim() };
  }

  const [, frontmatter_block, body] = match;
  /** @type {Record<string, string | string[]>} */
  const data = {};

  for (const line of frontmatter_block.split(/\r?\n/)) {
    const separator_index = line.indexOf(":");
    if (separator_index === -1 || line.trim().startsWith("#")) continue;
    const key = line.slice(0, separator_index).trim();
    if (!key) continue;
    data[key] = parse_frontmatter_value(line.slice(separator_index + 1));
  }

  return { data, content: body.trim() };
}

/**
 * Coerce a frontmatter value to a list of tags.
 *
 * @param {string | string[] | undefined} value - Raw `tags` value.
 * @returns {string[]} Tag list.
 */
function to_tag_list(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

/**
 * Build a normalised post object from a file path and its raw contents.
 *
 * @param {string} file_path - Path ending in `<slug>.md` (forward or back slashes).
 * @param {string} raw_text - File contents.
 * @returns {blog_post} Post.
 */
export function to_blog_post(file_path, raw_text) {
  const slug = file_path.split(/[\\/]/).pop().replace(/\.md$/, "");
  const { data, content } = parse_frontmatter(raw_text);
  return {
    slug,
    title: typeof data.title === "string" && data.title ? data.title : slug,
    date: typeof data.date === "string" ? data.date : "",
    excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
    tags: to_tag_list(data.tags),
    content,
  };
}

/**
 * Sort comparator: newest post first.
 *
 * @param {blog_post} post_a - First post.
 * @param {blog_post} post_b - Second post.
 * @returns {number} Sort order.
 */
export function compare_posts_newest_first(post_a, post_b) {
  return post_b.date.localeCompare(post_a.date);
}
