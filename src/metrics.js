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
 * Counts the number of words in a string.
 *
 * @example
 * wordCount('The quick brown fox'); // 4
 * wordCount('');                    // 0
 *
 * @param {string} str - Input string.
 * @returns {number} Non-negative integer representing the word count.
 */
function wordCount(str) {
  validateString(str);
  const trimmed = str.trim();
  if (trimmed.length === 0) {
    return 0;
  }
  const words = trimmed.match(/\S+/g);
  return words ? words.length : 0;
}

/**
 * Estimates reading time for a given text.
 *
 * Calculation behavior:
 * - words: Non-negative integer word count.
 * - timeMs: Estimated reading time in milliseconds, rounded to the nearest integer.
 * - minutes: Ceiled integer reading time (minimum 1 when words > 0, 0 when words === 0).
 * - formatted: Human-readable reading time string ('0 min read', '1 min read', 'N min read').
 *
 * @example
 * readingTime('A short sentence');
 * // { words: 3, minutes: 1, timeMs: 900, formatted: '1 min read' }
 *
 * @param {string} str - The text to analyze.
 * @param {number} [wordsPerMinute=200] - Average reading speed in words per minute.
 * @returns {{ words: number, minutes: number, timeMs: number, formatted: string }}
 */
function readingTime(str, wordsPerMinute = 200) {
  validateString(str);

  if (
    typeof wordsPerMinute !== 'number' ||
    !Number.isFinite(wordsPerMinute) ||
    wordsPerMinute <= 0
  ) {
    throw new TypeError(
      `Expected wordsPerMinute to be a positive number, received ${wordsPerMinute}`
    );
  }

  const words = wordCount(str);

  if (words === 0) {
    return {
      words: 0,
      minutes: 0,
      timeMs: 0,
      formatted: '0 min read',
    };
  }

  const timeMs = Math.round((words / wordsPerMinute) * 60 * 1000);
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  const formatted = `${minutes} min read`;

  return {
    words,
    minutes,
    timeMs,
    formatted,
  };
}

module.exports = {
  wordCount,
  readingTime,
};
