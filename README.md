# str-craft-kit

[![npm version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://www.npmjs.com/package/str-craft-kit)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](#)
[![node](https://img.shields.io/badge/node-%3E%3D18.0.0-blue.svg)](#)
[![types](https://img.shields.io/badge/types-TypeScript-blue.svg)](#)

A high-performance, **zero-dependency** string transformation, formatting, sanitization, and validation utility toolkit for Node.js and modern JavaScript.

Designed with defensive programming, strict input validation, comprehensive edge-case handling, and full dual **ES Module (ESM)** and **CommonJS (CJS)** compatibility.

---

## Features

- ⚡ **Zero Dependencies:** 0 runtime dependencies for maximum speed, security, and minimal package footprint (< 10 KB).
- 🔄 **Dual Module Support:** First-class support for both ES Modules (`import`) and CommonJS (`require`).
- 🛡️ **TypeScript Ready:** Complete TypeScript definitions (`index.d.ts`) included out of the box.
- 🔒 **Defensive & Predictable:** Strict parameter type checks with clear `TypeError` messages and robust edge-case handling.
- 🧪 **Fully Tested:** 100% test coverage with native Node.js test runner across edge cases, unicode, and isolation tests.

---

## Installation

```bash
npm install str-craft-kit
```

---

## Quick Start

### ES Modules (ESM)

```javascript
import strCraftKit, { slugify, mask, readingTime, isEmail } from 'str-craft-kit';

// Named import
const slug = slugify('Café & Restaurant Guide!');
console.log(slug); // 'cafe-and-restaurant-guide'

// Default import
console.log(strCraftKit.camelCase('hello world')); // 'helloWorld'
```

### CommonJS (CJS)

```javascript
const strCraftKit = require('str-craft-kit');
const { slugify, mask, readingTime, isEmail } = require('str-craft-kit');

// Named require
const maskedEmail = mask('alex.developer@example.com', { type: 'email' });
console.log(maskedEmail); // 'a************r@example.com'

// Default require
console.log(strCraftKit.kebabCase('helloWorld')); // 'hello-world'
```

### TypeScript

```typescript
import strCraftKit, {
  slugify,
  readingTime,
  SlugifyOptions,
  ReadingTimeResult,
} from 'str-craft-kit';

const options: SlugifyOptions = { separator: '_', lowercase: true };
const slug: string = slugify('Hello World', options);

const stats: ReadingTimeResult = readingTime('A quick brown fox');
console.log(stats.formatted); // '1 min read'
```

---

## API Documentation

The library exports 17 functions organized into 5 categories:

1. [Casing Utilities](#casing-utilities)
2. [Formatting Utilities](#formatting-utilities)
3. [Sanitization & HTML Helpers](#sanitization--html-helpers)
4. [Metrics & Content Analysis](#metrics--content-analysis)
5. [Validation Utilities](#validation-utilities)

---

### Casing Utilities

#### `camelCase(str)`
Converts a string to `camelCase`, handling spaces, dashes, underscores, and acronyms.

- **Parameters:** `str: string`
- **Returns:** `string`
- **Edge cases:** Empty string `""` or whitespace-only returns `""`. Non-string inputs throw `TypeError`.

```javascript
import { camelCase } from 'str-craft-kit';

camelCase('hello world');        // 'helloWorld'
camelCase('foo-bar-baz');        // 'fooBarBaz'
camelCase('---mixed__delims--'); // 'mixedDelims'
camelCase('123 numbers test');   // '123NumbersTest'
```

#### `kebabCase(str)`
Converts a string to `kebab-case`.

- **Parameters:** `str: string`
- **Returns:** `string`
- **Edge cases:** Empty string `""` returns `""`. Non-string inputs throw `TypeError`.

```javascript
import { kebabCase } from 'str-craft-kit';

kebabCase('hello world');    // 'hello-world'
kebabCase('camelCaseText');  // 'camel-case-text'
kebabCase('PascalCaseText'); // 'pascal-case-text'
```

#### `snakeCase(str)`
Converts a string to `snake_case`.

- **Parameters:** `str: string`
- **Returns:** `string`
- **Edge cases:** Empty string `""` returns `""`. Non-string inputs throw `TypeError`.

```javascript
import { snakeCase } from 'str-craft-kit';

snakeCase('hello world'); // 'hello_world'
snakeCase('fooBarBaz');   // 'foo_bar_baz'
```

#### `pascalCase(str)`
Converts a string to `PascalCase`.

- **Parameters:** `str: string`
- **Returns:** `string`
- **Edge cases:** Empty string `""` returns `""`. Non-string inputs throw `TypeError`.

```javascript
import { pascalCase } from 'str-craft-kit';

pascalCase('hello world'); // 'HelloWorld'
pascalCase('foo-bar');     // 'FooBar'
```

#### `titleCase(str)`
Capitalizes words following standard English title conventions. Minor words (e.g., *a, an, and, but, for, in, of, on, the, to*) remain lowercase unless they are the first word.

- **Parameters:** `str: string`
- **Returns:** `string`
- **Edge cases:** Empty string `""` returns `""`. Non-string inputs throw `TypeError`.

```javascript
import { titleCase } from 'str-craft-kit';

titleCase('the old man and the sea'); // 'The Old Man and the Sea'
titleCase('a tale of two cities');     // 'A Tale of Two Cities'
```

---

### Formatting Utilities

#### `slugify(str, [options])`
Generates a clean, URL-safe slug from a string. Automatically normalizes Unicode diacritics (e.g., `é` $\to$ `e`), replaces `&` with `'and'`, strips invalid characters, and collapses duplicate separators.

- **Parameters:**
  - `str: string`: Input text.
  - `options?: object`:
    - `separator?: string` (default: `'-'`): Delimiter character.
    - `lowercase?: boolean` (default: `true`): Whether to lowercase the result.
    - `strict?: boolean` (default: `true`): Strips characters other than alphanumeric and separators.
- **Returns:** `string`
- **Edge cases:** Empty string `""` returns `""`. Leading and trailing separators are trimmed. Throws `TypeError` if `str` or `separator` is not a string.

```javascript
import { slugify } from 'str-craft-kit';

slugify('Café & Restaurant!');                   // 'cafe-and-restaurant'
slugify('Node.js 24 Released!', { separator: '_' }); // 'nodejs_24_released'
```

#### `truncate(str, length, [options])`
Truncates a string to a specified maximum length, optionally appending a suffix and avoiding mid-word breaks.

- **Parameters:**
  - `str: string`: String to truncate.
  - `length: number`: Maximum length of the returned string (including suffix). Must be a non-negative number.
  - `options?: object`:
    - `suffix?: string` (default: `'...'`): Suffix appended when truncated.
    - `preserveWords?: boolean` (default: `false`): Truncates at the last full word boundary.
- **Returns:** `string`
- **Edge cases:**
  - If `str.length <= length`, returns `str` unmodified.
  - If `length <= suffix.length`, returns `suffix.slice(0, length)`.
  - Non-string `str`, negative `length`, or non-number `length` throws `TypeError`.

```javascript
import { truncate } from 'str-craft-kit';

truncate('The quick brown fox', 11); // 'The quic...'
truncate('The quick brown fox', 15, { preserveWords: true }); // 'The quick...'
truncate('Short', 10); // 'Short'
```

#### `mask(str, [options])`
Masks sensitive string content with separate, predictable behaviors for emails and generic strings.

- **Parameters:**
  - `str: string`: Input string to mask.
  - `options?: object`:
    - `maskChar?: string` (default: `'*'`): Single masking character.
    - `type?: 'generic' | 'email'` (default: `'generic'`): Masking strategy.
    - `unmaskedStart?: number` (default: `0`): Visible characters at start (generic mode).
    - `unmaskedEnd?: number` (default: `4`): Visible characters at end (generic mode).
- **Returns:** `string`
- **Masking Behavior:**
  - **Email Mode (`type: 'email'`):**
    - Preserves domain (e.g., `@example.com`).
    - Local part $> 2$ chars: Keeps the first and last character unmasked and replaces middle characters with `maskChar`.
    - Local part $\le 2$ chars: Masks all local characters.
    - Fallback: If no `@` is found, automatically uses generic mode.
  - **Generic Mode (`type: 'generic'`):**
    - Unmasks `unmaskedStart` characters from the beginning and `unmaskedEnd` characters from the end.
    - If `str.length <= unmaskedStart + unmaskedEnd`, the entire string is masked.
- **Edge cases:** Empty string `""` returns `""`. `maskChar` with length $\ne 1$ throws `TypeError`.

```javascript
import { mask } from 'str-craft-kit';

// Generic Masking (defaults to masking everything except the last 4 characters)
mask('1234567890');                               // '******7890'
mask('API_SECRET_KEY_9999', { unmaskedStart: 4, unmaskedEnd: 4 }); // 'API_***********9999'
mask('1234', { unmaskedStart: 2, unmaskedEnd: 3 }); // '****' (shorter than boundaries)

// Email Masking
mask('john.doe@example.com', { type: 'email' }); // 'j******e@example.com'
mask('me@example.com', { type: 'email' });       // '**@example.com'
```

---

### Sanitization & HTML Helpers

#### `escapeHtml(str)`
Escapes HTML entities (`&`, `<`, `>`, `"`, `'`) for safe inclusion within HTML text nodes.

- **Parameters:** `str: string`
- **Returns:** `string`
- **Edge cases:** Empty string `""` returns `""`. Non-string inputs throw `TypeError`.

```javascript
import { escapeHtml } from 'str-craft-kit';

escapeHtml('<script>alert("xss")</script>');
// '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
```

#### `unescapeHtml(str)`
Unescapes HTML entities back to their original characters. Supports `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, and `&#x27;`.

- **Parameters:** `str: string`
- **Returns:** `string`
- **Edge cases:** Unrecognized entities are preserved unchanged. Empty string `""` returns `""`.

```javascript
import { unescapeHtml } from 'str-craft-kit';

unescapeHtml('&lt;b&gt;Hello &amp; welcome&lt;/b&gt;');
// '<b>Hello & welcome</b>'
```

#### `stripHtml(str)`
Removes HTML and XML tags from a string, returning plain text. Automatically removes `<script>` and `<style>` blocks with their inner contents, and preserves word separation around block elements (`<p>`, `<div>`, `<h1>`, `<li>`, etc.).

- **Parameters:** `str: string`
- **Returns:** `string`
- **Edge cases:** Empty string `""` returns `""`. Non-string inputs throw `TypeError`.

```javascript
import { stripHtml } from 'str-craft-kit';

stripHtml('<p>Hello <b>World</b>!</p>'); // 'Hello World!'
stripHtml('<script>evil()</script><p>Clean content</p>'); // 'Clean content'
stripHtml('<div>First</div><p>Second</p>'); // 'First Second'
```

---

### ⚠️ Security Considerations: HTML Helpers

> [!WARNING] Important Security Notice on `escapeHtml()` and `stripHtml()`
> 
> - **`escapeHtml(str)` Scope & Limitations:**
>   - Escapes `&`, `<`, `>`, `"`, and `'`.
>   - This provides safe rendering **strictly within HTML body text nodes** (e.g., `<div>${escapeHtml(text)}</div>`).
>   - It is **not** sufficient by itself to prevent XSS when inserting untrusted input into:
>     - HTML attributes without quotes (`<input value=${escapeHtml(text)}>`)
>     - Inline event handlers (`<button onclick="${escapeHtml(text)}">`)
>     - URI attributes (`<a href="${escapeHtml(text)}">` — dangerous protocols like `javascript:...` remain executable)
>     - Inline `<script>` or `<style>` blocks.
>
> - **`stripHtml(str)` Scope & Limitations:**
>   - `stripHtml` is a lightweight string utility designed **solely for plain-text extraction** (e.g., generating search index tokens, word counts, or article summary previews).
>   - **`stripHtml` ALONE DOES NOT PREVENT XSS.** It does not perform full HTML AST parsing or context-aware sanitization. Malformed markup, protocol injection (`javascript:...`), or CSS vectors cannot be sanitized safely with regex tag-stripping alone.
>   - **Recommendation:** If you need to render untrusted rich HTML submitted by users in a web browser, use a full-featured HTML sanitizer such as [DOMPurify](https://github.com/cure53/DOMPurify) or [sanitize-html](https://github.com/apostrophecms/sanitize-html).

---

### Metrics & Content Analysis

#### `wordCount(str)`
Counts words in a string, splitting on whitespace and ignoring extraneous spaces, tabs, and newlines.

- **Parameters:** `str: string`
- **Returns:** `number` (non-negative integer)
- **Edge cases:** Empty string `""` or whitespace-only returns `0`. Non-string inputs throw `TypeError`.

```javascript
import { wordCount } from 'str-craft-kit';

wordCount('The quick brown fox'); // 4
wordCount('   ');                 // 0
wordCount("one\t\ntwo   three");  // 3
```

#### `readingTime(str, [wordsPerMinute])`
Calculates estimated reading time based on word count.

- **Parameters:**
  - `str: string`: Text to analyze.
  - `wordsPerMinute?: number` (default: `200`): Average reading speed. Must be a finite positive number.
- **Returns:** `ReadingTimeResult` object:
  - `words: number`: Exact word count.
  - `minutes: number`: Ceiled reading time in minutes (minimum 1 if `words > 0`, 0 if `words === 0`).
  - `timeMs: number`: Exact reading time in milliseconds rounded to the nearest integer.
  - `formatted: string`: Human-readable reading duration (`'0 min read'`, `'1 min read'`, or `'N min read'`).
- **Edge cases:** Empty string returns `{ words: 0, minutes: 0, timeMs: 0, formatted: '0 min read' }`. Non-positive `wordsPerMinute` throws `TypeError`.

```javascript
import { readingTime } from 'str-craft-kit';

// Empty text
readingTime('');
// { words: 0, minutes: 0, timeMs: 0, formatted: '0 min read' }

// Short text
readingTime('A quick brown fox');
// { words: 4, minutes: 1, timeMs: 1200, formatted: '1 min read' }

// Article text (500 words at 200 WPM)
const text = new Array(500).fill('word').join(' ');
readingTime(text, 200);
// { words: 500, minutes: 3, timeMs: 150000, formatted: '3 min read' }
```

---

### Validation Utilities

#### `isEmail(str)`
Validates whether a string is a properly formatted email address conforming to RFC 5322 structure without regex backtracking vulnerabilities.

- **Parameters:** `str: string`
- **Returns:** `boolean`
- **Edge cases:** Checks total length $\le 254$ and local-part $\le 64$. Empty string returns `false`. Non-string inputs throw `TypeError`.

```javascript
import { isEmail } from 'str-craft-kit';

isEmail('user@example.com');        // true
isEmail('user.name+tag@domain.co'); // true
isEmail('invalid@');                // false
isEmail('user@domain');             // false
```

#### `isUrl(str)`
Validates whether a string is a valid `http://` or `https://` URL using Node's native `URL` parser.

- **Parameters:** `str: string`
- **Returns:** `boolean`
- **Edge cases:** Non-HTTP protocols (`ftp://`, `mailto:`) return `false`. Relative paths return `false`. Non-string inputs throw `TypeError`.

```javascript
import { isUrl } from 'str-craft-kit';

isUrl('https://example.com/api?v=1'); // true
isUrl('http://localhost:3000');       // true
isUrl('ftp://example.com');           // false
isUrl('not a url');                   // false
```

#### `isNumeric(str)`
Validates whether a string represents a valid, finite number (integers, decimals, negative numbers, scientific notation).

- **Parameters:** `str: string`
- **Returns:** `boolean`
- **Edge cases:** Rejects `'Infinity'`, `'-Infinity'`, `NaN`, empty strings, and whitespace. Non-string inputs throw `TypeError`.

```javascript
import { isNumeric } from 'str-craft-kit';

isNumeric('42');       // true
isNumeric('-12.34');   // true
isNumeric('1e5');      // true
isNumeric('  99  ');   // true
isNumeric('abc');      // false
isNumeric('Infinity'); // false
```

#### `isEmpty(str, [trimWhitespace])`
Checks whether a string is empty (`""`).

- **Parameters:**
  - `str: string`: String to test.
  - `trimWhitespace?: boolean` (default: `true`): If `true`, whitespace-only strings are considered empty.
- **Returns:** `boolean`
- **Edge cases:** Non-string `str` or non-boolean `trimWhitespace` throws `TypeError`.

```javascript
import { isEmpty } from 'str-craft-kit';

isEmpty('');            // true
isEmpty('   ');         // true (trimmed by default)
isEmpty('   ', false);  // false (whitespace preserved)
isEmpty('hello');       // false
```

---

## Practical Combination Examples

### 1. Generating Blog Post Metadata from Markdown / HTML Content
```javascript
import { stripHtml, truncate, wordCount, readingTime, slugify } from 'str-craft-kit';

const articleTitle = 'Building High-Speed Node.js APIs in 2026!';
const htmlContent = `
  <p>Building high-speed APIs requires careful architecture, efficient algorithms,
  and zero-dependency utility libraries that avoid runtime bloat.</p>
`;

// 1. Generate URL slug
const slug = slugify(articleTitle);
// 'building-high-speed-nodejs-apis-in-2026'

// 2. Extract plain text and generate a clean excerpt preview
const plainText = stripHtml(htmlContent);
const excerpt = truncate(plainText, 80, { preserveWords: true });
// 'Building high-speed APIs requires careful architecture, efficient...'

// 3. Compute reading metrics
const stats = readingTime(plainText);
console.log({ slug, excerpt, readTime: stats.formatted });
```

### 2. User Input Sanitization & Privacy Masking for Logs
```javascript
import { isEmail, mask, escapeHtml, isEmpty } from 'str-craft-kit';

function processUserSubmission({ name, email, bio }) {
  if (isEmpty(name) || !isEmail(email)) {
    throw new Error('Invalid submission: name and valid email are required.');
  }

  // Safe masking for logging audit trails without leaking PII
  const logSafeEmail = mask(email, { type: 'email' });
  console.log(`Processing submission for: ${logSafeEmail}`);

  // Escape user-provided bio for HTML rendering
  const safeBio = escapeHtml(bio || '');

  return { name, email, safeBio };
}
```

---

## License

MIT © [Mohd Kaif](LICENSE)
