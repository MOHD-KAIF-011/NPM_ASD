import casing from './casing.js';
import formatting from './formatting.js';
import sanitization from './sanitization.js';
import metrics from './metrics.js';
import validation from './validation.js';

export const {
  camelCase,
  kebabCase,
  snakeCase,
  pascalCase,
  titleCase,
} = casing;

export const {
  slugify,
  truncate,
  mask,
} = formatting;

export const {
  escapeHtml,
  unescapeHtml,
  stripHtml,
} = sanitization;

export const {
  wordCount,
  readingTime,
} = metrics;

export const {
  isEmail,
  isUrl,
  isNumeric,
  isEmpty,
} = validation;

const strCraftKit = {
  camelCase,
  kebabCase,
  snakeCase,
  pascalCase,
  titleCase,
  slugify,
  truncate,
  mask,
  escapeHtml,
  unescapeHtml,
  stripHtml,
  wordCount,
  readingTime,
  isEmail,
  isUrl,
  isNumeric,
  isEmpty,
};

export default strCraftKit;
