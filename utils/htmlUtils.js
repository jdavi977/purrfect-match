/**
 * Utility functions for handling HTML content in React Native
 */

/**
 * Decodes HTML entities in a string
 * @param {string} text - The text containing HTML entities
 * @returns {string} The decoded text
 */
export const decodeHtmlEntities = (text) => {
  if (!text) return '';
  
  // Create a temporary element to decode HTML entities
  const entities = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&cent;': '¢',
    '&pound;': '£',
    '&yen;': '¥',
    '&euro;': '€',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
    '&hellip;': '…',
    '&mdash;': '—',
    '&ndash;': '–',
    '&bull;': '•',
  };
  
  let decodedText = text;
  
  // Replace all HTML entities with their corresponding characters
  Object.keys(entities).forEach(entity => {
    const regex = new RegExp(entity, 'g');
    decodedText = decodedText.replace(regex, entities[entity]);
  });
  
  return decodedText;
};

/**
 * Removes HTML tags from a string
 * @param {string} html - The HTML string
 * @returns {string} The text without HTML tags
 */
export const stripHtmlTags = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
};

/**
 * Formats a pet description by decoding HTML entities and removing HTML tags
 * @param {string} description - The pet description
 * @returns {string} The formatted description
 */
export const formatPetDescription = (description) => {
  if (!description) return '';
  
  // First decode HTML entities, then strip HTML tags
  const decodedText = decodeHtmlEntities(description);
  return stripHtmlTags(decodedText);
};
