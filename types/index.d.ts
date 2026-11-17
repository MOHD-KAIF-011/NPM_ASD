/**
 * Configuration options for slugify.
 */
export interface SlugifyOptions {
  /** Separator character to join slug words. Default is '-'. */
  separator?: string;
  /** Whether to lowercase the slug output. Default is true. */
  lowercase?: boolean;
  /** Whether to strip non-alphanumeric characters. Default is true. */
  strict?: boolean;
}

/**
 * Configuration options for truncate.
 */
export interface TruncateOptions {
  /** Suffix appended to truncated text. Default is '...'. */
  suffix?: string;
  /** Whether to avoid truncating in the middle of words. Default is false. */
  preserveWords?: boolean;
}

/**
 * Configuration options for mask.
 */
export interface MaskOptions {
  /** Character used for masking. Default is '*'. Must be a single character. */
  maskChar?: string;
  /** Masking strategy: 'generic' or 'email'. Default is 'generic'. */
  type?: 'generic' | 'email';
  /** Number of characters unmasked at the start (generic type). Default is 0. */
  unmaskedStart?: number;
  /** Number of characters unmasked at the end (generic type). Default is 4. */
  unmaskedEnd?: number;
}

/**
 * Result object returned by readingTime.
 */
export interface ReadingTimeResult {
  /** Total number of words. */
  words: number;
  /** Estimated reading time in minutes (ceiled, min 1 if words > 0). */
  minutes: number;
  /** Estimated reading time in milliseconds. */
  timeMs: number;
  /** Human-readable reading duration string (e.g., '1 min read'). */
  formatted: string;
}

// Casing functions
export function camelCase(str: string): string;
export function kebabCase(str: string): string;
export function snakeCase(str: string): string;
export function pascalCase(str: string): string;
export function titleCase(str: string): string;

// Formatting functions
export function slugify(str: string, options?: SlugifyOptions): string;
export function truncate(str: string, length: number, options?: TruncateOptions): string;
export function mask(str: string, options?: MaskOptions): string;

// Sanitization functions
export function escapeHtml(str: string): string;
export function unescapeHtml(str: string): string;
export function stripHtml(str: string): string;

// Metrics functions
export function wordCount(str: string): number;
export function readingTime(str: string, wordsPerMinute?: number): ReadingTimeResult;

// Validation functions
export function isEmail(str: string): boolean;
export function isUrl(str: string): boolean;
export function isNumeric(str: string): boolean;
export function isEmpty(str: string, trimWhitespace?: boolean): boolean;

export interface StrCraftKit {
  camelCase: typeof camelCase;
  kebabCase: typeof kebabCase;
  snakeCase: typeof snakeCase;
  pascalCase: typeof pascalCase;
  titleCase: typeof titleCase;
  slugify: typeof slugify;
  truncate: typeof truncate;
  mask: typeof mask;
  escapeHtml: typeof escapeHtml;
  unescapeHtml: typeof unescapeHtml;
  stripHtml: typeof stripHtml;
  wordCount: typeof wordCount;
  readingTime: typeof readingTime;
  isEmail: typeof isEmail;
  isUrl: typeof isUrl;
  isNumeric: typeof isNumeric;
  isEmpty: typeof isEmpty;
}

declare const strCraftKit: StrCraftKit;
export default strCraftKit;
