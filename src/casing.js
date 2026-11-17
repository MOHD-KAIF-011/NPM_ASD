/**
 * Extracts individual words from a string, handling camelCase, PascalCase,
 * snake_case, kebab-case, numbers, and arbitrary delimiters.
 *
 * @param {string} str
 * @returns {string[]}
 */
function getWords(str) {
  if (typeof str !== 'string') {
    throw new TypeError(`Expected a string as input, received ${typeof str}`);
  }
  const trimmed = str.trim();
  if (trimmed.length === 0) {
    return [];
  }
  // Matches words: handles camelCase, PascalCase, acronyms, and alphanumeric chunks
  const matches = trimmed.match(/[A-Z]+(?![a-z0-9])|[A-Z]?[a-z0-9]+|[0-9]+/g);
  return matches || [];
}

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
 * Converts a string to camelCase.
 *
 * @example
 * camelCase('hello world'); // 'helloWorld'
 * camelCase('foo-bar_baz'); // 'fooBarBaz'
 *
 * @param {string} str
 * @returns {string}
 */
function camelCase(str) {
  validateString(str);
  const words = getWords(str);
  if (words.length === 0) return '';
  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index === 0) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

/**
 * Converts a string to kebab-case.
 *
 * @example
 * kebabCase('hello world'); // 'hello-world'
 * kebabCase('camelCase');   // 'camel-case'
 *
 * @param {string} str
 * @returns {string}
 */
function kebabCase(str) {
  validateString(str);
  const words = getWords(str);
  if (words.length === 0) return '';
  return words.map((w) => w.toLowerCase()).join('-');
}

/**
 * Converts a string to snake_case.
 *
 * @example
 * snakeCase('hello world'); // 'hello_world'
 * snakeCase('fooBar');      // 'foo_bar'
 *
 * @param {string} str
 * @returns {string}
 */
function snakeCase(str) {
  validateString(str);
  const words = getWords(str);
  if (words.length === 0) return '';
  return words.map((w) => w.toLowerCase()).join('_');
}

/**
 * Converts a string to PascalCase.
 *
 * @example
 * pascalCase('hello world'); // 'HelloWorld'
 * pascalCase('foo-bar');     // 'FooBar'
 *
 * @param {string} str
 * @returns {string}
 */
function pascalCase(str) {
  validateString(str);
  const words = getWords(str);
  if (words.length === 0) return '';
  return words
    .map((word) => {
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

const MINOR_WORDS = new Set([
  'a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in',
  'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'
]);

/**
 * Converts a string to Title Case following standard capitalization conventions.
 * Minor words (prepositions/conjunctions/articles) remain lowercase unless at the start.
 *
 * @example
 * titleCase('the old man and the sea'); // 'The Old Man and the Sea'
 *
 * @param {string} str
 * @returns {string}
 */
function titleCase(str) {
  validateString(str);
  const words = getWords(str);
  if (words.length === 0) return '';
  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index > 0 && MINOR_WORDS.has(lower)) {
        return lower;
      }
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

module.exports = {
  camelCase,
  kebabCase,
  snakeCase,
  pascalCase,
  titleCase,
};
