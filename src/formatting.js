/**
 * Validates that the input is a string.
 * @param {unknown} input
 */
function validateString(input) {
  if (typeof input !== 'string') {
    throw new TypeError(`Expected a string as input, received ${typeof input}`);
  }
}

/**
 * Generates an SEO-friendly, URL-safe slug from a string.
 *
 * @param {string} str - Input string to slugify.
 * @param {object} [options] - Configuration options.
 * @param {string} [options.separator='-'] - Separator character to join slug words.
 * @param {boolean} [options.lowercase=true] - Whether to convert output to lowercase.
 * @param {boolean} [options.strict=true] - Whether to strip non-alphanumeric characters.
 * @returns {string} The slugified string.
 */
function slugify(str, options = {}) {
  validateString(str);

  const {
    separator = '-',
    lowercase = true,
    strict = true,
  } = options;

  if (typeof separator !== 'string') {
    throw new TypeError(`Expected separator to be a string, received ${typeof separator}`);
  }

  if (str.trim().length === 0) {
    return '';
  }

  // 1. Normalize unicode diacritics (e.g., 'Café' -> 'Cafe')
  let result = str
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '');

  // 2. Replace ampersands with 'and'
  result = result.replace(/&/g, ' and ');

  // 3. Lowercase if enabled
  if (lowercase) {
    result = result.toLowerCase();
  }

  // 4. Clean characters
  if (strict) {
    // Keep letters, numbers, spaces, and hyphens/underscores
    result = result.replace(/[^a-zA-Z0-9\s_-]/g, '');
  }

  // 5. Replace spaces/consecutive separators with single separator
  const escapedSeparator = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const separatorRegex = new RegExp(`[\\s_-]+`, 'g');
  result = result.replace(separatorRegex, separator);

  // 6. Collapse duplicate separators
  const multiSepRegex = new RegExp(`(${escapedSeparator}){2,}`, 'g');
  result = result.replace(multiSepRegex, separator);

  // 7. Trim leading and trailing separators
  const trimRegex = new RegExp(`^${escapedSeparator}+|${escapedSeparator}+$`, 'g');
  return result.replace(trimRegex, '');
}

/**
 * Truncates a string to a specified maximum length, optionally appending a suffix
 * and preserving whole words.
 *
 * @param {string} str - String to truncate.
 * @param {number} length - Maximum length of the returned string.
 * @param {object} [options] - Truncation options.
 * @param {string} [options.suffix='...'] - Suffix appended when truncated.
 * @param {boolean} [options.preserveWords=false] - Whether to avoid cutting words in half.
 * @returns {string} Truncated string.
 */
function truncate(str, length, options = {}) {
  validateString(str);

  if (typeof length !== 'number' || Number.isNaN(length) || length < 0) {
    throw new TypeError(`Expected length to be a non-negative number, received ${length}`);
  }

  const {
    suffix = '...',
    preserveWords = false,
  } = options;

  if (typeof suffix !== 'string') {
    throw new TypeError(`Expected suffix to be a string, received ${typeof suffix}`);
  }

  if (str.length <= length) {
    return str;
  }

  if (length <= suffix.length) {
    return suffix.slice(0, length);
  }

  const targetContentLen = length - suffix.length;
  let sliced = str.slice(0, targetContentLen);

  if (preserveWords) {
    const lastSpace = sliced.lastIndexOf(' ');
    if (lastSpace > 0) {
      sliced = sliced.slice(0, lastSpace).trimEnd();
    }
  }

  return sliced + suffix;
}

/**
 * Masks sensitive parts of a string.
 * Supports distinct predictable default modes for 'email' and 'generic' strings.
 *
 * @param {string} str - The string to mask.
 * @param {object} [options] - Masking options.
 * @param {string} [options.maskChar='*'] - Character used to mask content.
 * @param {'generic'|'email'} [options.type='generic'] - Masking strategy.
 * @param {number} [options.unmaskedStart=0] - Number of characters unmasked at start (generic).
 * @param {number} [options.unmaskedEnd=4] - Number of characters unmasked at end (generic).
 * @returns {string} Masked string.
 */
function mask(str, options = {}) {
  validateString(str);

  const {
    maskChar = '*',
    type = 'generic',
    unmaskedStart = 0,
    unmaskedEnd = 4,
  } = options;

  if (typeof maskChar !== 'string' || maskChar.length !== 1) {
    throw new TypeError(`Expected maskChar to be a single character, received "${maskChar}"`);
  }

  if (str.length === 0) {
    return '';
  }

  if (type === 'email' && str.includes('@')) {
    const atIndex = str.lastIndexOf('@');
    const localPart = str.slice(0, atIndex);
    const domain = str.slice(atIndex);

    if (localPart.length <= 2) {
      return maskChar.repeat(localPart.length) + domain;
    }

    const maskedLocal =
      localPart[0] +
      maskChar.repeat(localPart.length - 2) +
      localPart[localPart.length - 1];

    return maskedLocal + domain;
  }

  // Generic masking
  const start = Math.max(0, unmaskedStart);
  const end = Math.max(0, unmaskedEnd);

  if (str.length <= start + end) {
    return maskChar.repeat(str.length);
  }

  const startSegment = str.slice(0, start);
  const endSegment = end > 0 ? str.slice(str.length - end) : '';
  const maskedLength = str.length - start - end;

  return startSegment + maskChar.repeat(maskedLength) + endSegment;
}

module.exports = {
  slugify,
  truncate,
  mask,
};
