/**
 * Pluralise a count for data readouts, e.g. "1 post" / "3 posts".
 *
 * @param {number} count - Item count.
 * @param {string} singular - Singular noun.
 * @param {string} plural - Plural noun.
 * @returns {string} Formatted count.
 */
export function format_count(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural}`;
}
