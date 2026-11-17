const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const strCraftKit = require('../src/index.cjs');
const {
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
} = strCraftKit;

describe('README.md code examples verification', () => {
  test('Quick start examples execute accurately', () => {
    const slug = slugify('Café & Restaurant Guide!');
    assert.equal(slug, 'cafe-and-restaurant-guide');

    const camel = strCraftKit.camelCase('hello world');
    assert.equal(camel, 'helloWorld');

    const maskedEmail = mask('alex.developer@example.com', { type: 'email' });
    assert.equal(maskedEmail, 'a************r@example.com');

    const kebab = strCraftKit.kebabCase('helloWorld');
    assert.equal(kebab, 'hello-world');
  });

  test('Casing utilities examples in README execute accurately', () => {
    assert.equal(camelCase('hello world'), 'helloWorld');
    assert.equal(camelCase('foo-bar-baz'), 'fooBarBaz');
    assert.equal(camelCase('---mixed__delims--'), 'mixedDelims');
    assert.equal(camelCase('123 numbers test'), '123NumbersTest');

    assert.equal(kebabCase('hello world'), 'hello-world');
    assert.equal(kebabCase('camelCaseText'), 'camel-case-text');
    assert.equal(kebabCase('PascalCaseText'), 'pascal-case-text');

    assert.equal(snakeCase('hello world'), 'hello_world');
    assert.equal(snakeCase('fooBarBaz'), 'foo_bar_baz');

    assert.equal(pascalCase('hello world'), 'HelloWorld');
    assert.equal(pascalCase('foo-bar'), 'FooBar');

    assert.equal(titleCase('the old man and the sea'), 'The Old Man and the Sea');
    assert.equal(titleCase('a tale of two cities'), 'A Tale of Two Cities');
  });

  test('Formatting utilities examples in README execute accurately', () => {
    assert.equal(slugify('Café & Restaurant!'), 'cafe-and-restaurant');
    assert.equal(slugify('Node.js 24 Released!', { separator: '_' }), 'nodejs_24_released');

    assert.equal(truncate('The quick brown fox', 11), 'The quic...');
    assert.equal(truncate('The quick brown fox', 15, { preserveWords: true }), 'The quick...');
    assert.equal(truncate('Short', 10), 'Short');

    assert.equal(mask('1234567890'), '******7890');
    assert.equal(mask('API_SECRET_KEY_9999', { unmaskedStart: 4, unmaskedEnd: 4 }), 'API_***********9999');
    assert.equal(mask('1234', { unmaskedStart: 2, unmaskedEnd: 3 }), '****');

    assert.equal(mask('john.doe@example.com', { type: 'email' }), 'j******e@example.com');
    assert.equal(mask('me@example.com', { type: 'email' }), '**@example.com');
  });

  test('Sanitization & HTML helpers examples in README execute accurately', () => {
    assert.equal(
      escapeHtml('<script>alert("xss")</script>'),
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
    );

    assert.equal(
      unescapeHtml('&lt;b&gt;Hello &amp; welcome&lt;/b&gt;'),
      '<b>Hello & welcome</b>'
    );

    assert.equal(stripHtml('<p>Hello <b>World</b>!</p>'), 'Hello World!');
    assert.equal(
      stripHtml('<script>evil()</script><p>Clean content</p>'),
      'Clean content'
    );
    assert.equal(stripHtml('<div>First</div><p>Second</p>'), 'First Second');
  });

  test('Metrics examples in README execute accurately', () => {
    assert.equal(wordCount('The quick brown fox'), 4);
    assert.equal(wordCount('   '), 0);
    assert.equal(wordCount('one\t\ntwo   three'), 3);

    assert.deepEqual(readingTime(''), {
      words: 0,
      minutes: 0,
      timeMs: 0,
      formatted: '0 min read',
    });

    const short = readingTime('A quick brown fox');
    assert.deepEqual(short, {
      words: 4,
      minutes: 1,
      timeMs: 1200,
      formatted: '1 min read',
    });

    const text500 = new Array(500).fill('word').join(' ');
    const article = readingTime(text500, 200);
    assert.deepEqual(article, {
      words: 500,
      minutes: 3,
      timeMs: 150000,
      formatted: '3 min read',
    });
  });

  test('Validation examples in README execute accurately', () => {
    assert.equal(isEmail('user@example.com'), true);
    assert.equal(isEmail('user.name+tag@domain.co'), true);
    assert.equal(isEmail('invalid@'), false);
    assert.equal(isEmail('user@domain'), false);

    assert.equal(isUrl('https://example.com/api?v=1'), true);
    assert.equal(isUrl('http://localhost:3000'), true);
    assert.equal(isUrl('ftp://example.com'), false);
    assert.equal(isUrl('not a url'), false);

    assert.equal(isNumeric('42'), true);
    assert.equal(isNumeric('-12.34'), true);
    assert.equal(isNumeric('1e5'), true);
    assert.equal(isNumeric('  99  '), true);
    assert.equal(isNumeric('abc'), false);
    assert.equal(isNumeric('Infinity'), false);

    assert.equal(isEmpty(''), true);
    assert.equal(isEmpty('   '), true);
    assert.equal(isEmpty('   ', false), false);
    assert.equal(isEmpty('hello'), false);
  });

  test('Practical combination examples in README execute accurately', () => {
    // 1. Blog metadata
    const articleTitle = 'Building High-Speed Node.js APIs in 2026!';
    const htmlContent = `
      <p>Building high-speed APIs requires careful architecture, efficient algorithms,
      and zero-dependency utility libraries that avoid runtime bloat.</p>
    `;

    const slug = slugify(articleTitle);
    assert.equal(slug, 'building-high-speed-nodejs-apis-in-2026');

    const plainText = stripHtml(htmlContent);
    const excerpt = truncate(plainText, 80, { preserveWords: true });
    assert.equal(
      excerpt,
      'Building high-speed APIs requires careful architecture, efficient...'
    );

    const stats = readingTime(plainText);
    assert.equal(stats.formatted, '1 min read');

    // 2. User submission masking & escaping
    function processUserSubmission({ name, email, bio }) {
      if (isEmpty(name) || !isEmail(email)) {
        throw new Error('Invalid submission: name and valid email are required.');
      }
      const logSafeEmail = mask(email, { type: 'email' });
      const safeBio = escapeHtml(bio || '');
      return { name, email, safeBio, logSafeEmail };
    }

    const processed = processUserSubmission({
      name: 'Kaif',
      email: 'kaif@example.com',
      bio: '<script>alert("hi")</script>',
    });

    assert.equal(processed.logSafeEmail, 'k**f@example.com');
    assert.equal(
      processed.safeBio,
      '&lt;script&gt;alert(&quot;hi&quot;)&lt;/script&gt;'
    );
  });
});
