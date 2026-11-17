/**
 * Validates that the input is a string.
 * @param {unknown} input
 */
function validateString(input) {
  if (typeof input !== 'string') {
    throw new TypeError(`Expected a string as input, received ${typeof input}`);
  }
}

// RFC 5322 compliant email regex pattern (safe against ReDoS)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Validates whether a string is a properly formatted email address.
 *
 * @example
 * isEmail('user@example.com'); // true
 * isEmail('invalid-email');    // false
 *
 * @param {string} str - String to test.
 * @returns {boolean} True if string is a valid email, false otherwise.
 */
function isEmail(str) {
  validateString(str);
  if (str.length === 0 || str.length > 254) {
    return false;
  }
  const atIndex = str.indexOf('@');
  if (atIndex < 1 || atIndex > 64) {
    return false;
  }
  return EMAIL_REGEX.test(str);
}

/**
 * Validates whether a string is a valid HTTP or HTTPS URL.
 *
 * @example
 * isUrl('https://example.com/path?q=1'); // true
 * isUrl('ftp://example.com');            // false
 * isUrl('not a url');                    // false
 *
 * @param {string} str - String to test.
 * @returns {boolean} True if string is a valid HTTP/HTTPS URL, false otherwise.
 */
function isUrl(str) {
  validateString(str);
  if (str.length === 0) {
    return false;
  }
  try {
    const parsed = new URL(str);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validates whether a string represents a valid, finite number.
 *
 * @example
 * isNumeric('42');      // true
 * isNumeric('-3.1415'); // true
 * isNumeric('1e5');     // true
 * isNumeric('abc');     // false
 * isNumeric('Infinity');// false
 *
 * @param {string} str - String to test.
 * @returns {boolean} True if string represents a finite number, false otherwise.
 */
function isNumeric(str) {
  validateString(str);
  const trimmed = str.trim();
  if (trimmed.length === 0) {
    return false;
  }
  if (trimmed === 'Infinity' || trimmed === '-Infinity') {
    return false;
  }
  const num = Number(trimmed);
  return !Number.isNaN(num) && Number.isFinite(num);
}

/**
 * Checks whether a string is empty, optionally ignoring leading and trailing whitespace.
 *
 * @example
 * isEmpty('');                  // true
 * isEmpty('   ');               // true
 * isEmpty('   ', false);        // false
 * isEmpty('hello');             // false
 *
 * @param {string} str - String to test.
 * @param {boolean} [trimWhitespace=true] - Whether to trim whitespace before checking.
 * @returns {boolean} True if the string is empty, false otherwise.
 */
function isEmpty(str, trimWhitespace = true) {
  validateString(str);
  if (typeof trimWhitespace !== 'boolean') {
    throw new TypeError(`Expected trimWhitespace to be a boolean, received ${typeof trimWhitespace}`);
  }
  return trimWhitespace ? str.trim().length === 0 : str.length === 0;
}

module.exports = {
  isEmail,
  isUrl,
  isNumeric,
  isEmpty,
};
