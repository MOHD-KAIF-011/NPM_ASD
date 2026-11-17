/**
 * Validates that the input is a string.
 * @param {unknown} input
 */
function validateString(input) {
  if (typeof input !== 'string') {
    throw new TypeError(`Expected a string as input, received ${typeof input}`);
  }
}

const HTML_ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const HTML_UNESCAPE_MAP = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&#x27;': "'",
};

/**
 * Escapes characters with special meaning in HTML (&, <, >, ", ').
 *
 * SECURITY LIMITATION:
 * This function escapes characters for safe inclusion inside standard HTML text nodes.
 * It is NOT sufficient on its own to sanitize user input placed within HTML attributes,
 * inline JavaScript event handlers (e.g., onclick), CSS, or URLs (javascript:).
 *
 * @example
 * escapeHtml('<script>alert("xss")</script>');
 * // '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 *
 * @param {string} str - String to escape.
 * @returns {string} Escaped string.
 */
function escapeHtml(str) {
  validateString(str);
  if (str.length === 0) return '';
  return str.replace(/[&<>"']/g, (match) => HTML_ESCAPE_MAP[match]);
}

/**
 * Unescapes HTML entities back to their original characters.
 *
 * @example
 * unescapeHtml('&lt;div&gt;Hello &amp; welcome&lt;/div&gt;');
 * // '<div>Hello & welcome</div>'
 *
 * @param {string} str - String containing HTML entities.
 * @returns {string} Unescaped string.
 */
function unescapeHtml(str) {
  validateString(str);
  if (str.length === 0) return '';
  return str.replace(/&(amp|lt|gt|quot|#39|#x27);/g, (match) => HTML_UNESCAPE_MAP[match] || match);
}

/**
 * Strips HTML and XML tags from a string, returning plain text.
 *
 * CRITICAL SECURITY DISCLAIMER:
 * stripHtml is a lightweight utility designed SOLELY for plain-text extraction
 * (such as generating search indices, word counts, or blog excerpt previews).
 * IT DOES NOT PREVENT XSS AND MUST NEVER BE USED AS A STANDALONE SANITIZER
 * for rendering untrusted user input in HTML. Use a dedicated DOM sanitizer
 * (e.g., DOMPurify) for rendering untrusted rich text safely.
 *
 * @example
 * stripHtml('<p>Hello <b>World</b>!</p>'); // 'Hello World!'
 *
 * @param {string} str - String containing HTML/XML markup.
 * @returns {string} Plain text with markup removed.
 */
function stripHtml(str) {
  validateString(str);
  if (str.length === 0) return '';

  // 1. Remove script and style tags and their contents completely
  let text = str.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, '');

  // 2. Replace closing block elements with spaces to prevent words colliding
  text = text.replace(/<\/(p|div|h[1-6]|li|tr|section|article|header|footer)>/gi, ' ');

  // 3. Remove all remaining tags
  text = text.replace(/<[^>]+>/g, '');

  // 4. Collapse multiple spaces and trim
  return text.replace(/[ \t\v\f\r]+/g, ' ').replace(/ *\n */g, '\n').trim();
}

module.exports = {
  escapeHtml,
  unescapeHtml,
  stripHtml,
};
