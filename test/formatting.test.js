const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { slugify, truncate, mask } = require('../src/formatting.js');

describe('formatting module', () => {
  describe('slugify', () => {
    test('creates URL-friendly slug from standard text', () => {
      assert.equal(slugify('Hello World'), 'hello-world');
    });

    test('replaces & with and and removes diacritics', () => {
      assert.equal(slugify('Café & Restaurant!'), 'cafe-and-restaurant');
    });

    test('collapses duplicate separators and trims boundary separators', () => {
      assert.equal(slugify('---hello---world---'), 'hello-world');
    });

    test('supports custom separator', () => {
      assert.equal(slugify('hello world', { separator: '_' }), 'hello_world');
    });

    test('handles empty and whitespace strings', () => {
      assert.equal(slugify(''), '');
      assert.equal(slugify('   '), '');
    });

    test('throws TypeError on non-string inputs', () => {
      assert.throws(() => slugify(null), /Expected a string as input/);
      assert.throws(() => slugify('valid', { separator: 123 }), /Expected separator to be a string/);
    });
  });

  describe('truncate', () => {
    test('returns original string if length is sufficient', () => {
      assert.equal(truncate('hello', 10), 'hello');
      assert.equal(truncate('hello', 5), 'hello');
    });

    test('truncates with default suffix', () => {
      assert.equal(truncate('hello world', 8), 'hello...');
    });

    test('supports custom suffix', () => {
      assert.equal(truncate('hello world', 8, { suffix: ' [more]' }), 'h [more]');
    });

    test('preserves words when requested', () => {
      assert.equal(
        truncate('the quick brown fox', 15, { preserveWords: true }),
        'the quick...'
      );
    });

    test('handles length shorter than or equal to suffix length', () => {
      assert.equal(truncate('hello', 2, { suffix: '...' }), '..');
      assert.equal(truncate('hello', 3, { suffix: '...' }), '...');
    });

    test('throws TypeError on invalid inputs', () => {
      assert.throws(() => truncate(null, 5), /Expected a string as input/);
      assert.throws(() => truncate('hello', -1), /Expected length to be a non-negative number/);
      assert.throws(() => truncate('hello', '5'), /Expected length to be a non-negative number/);
      assert.throws(() => truncate('hello', 5, { suffix: 123 }), /Expected suffix to be a string/);
    });
  });

  describe('mask', () => {
    describe('generic masking', () => {
      test('masks default end characters (keeping last 4)', () => {
        assert.equal(mask('1234567890'), '******7890');
      });

      test('supports custom unmaskedStart and unmaskedEnd', () => {
        assert.equal(
          mask('1234567890', { unmaskedStart: 2, unmaskedEnd: 2 }),
          '12******90'
        );
      });

      test('masks entire string if shorter than unmasked boundaries', () => {
        assert.equal(mask('1234', { unmaskedStart: 2, unmaskedEnd: 3 }), '****');
      });

      test('supports custom maskChar', () => {
        assert.equal(mask('1234567890', { maskChar: '#' }), '######7890');
      });

      test('handles empty string', () => {
        assert.equal(mask(''), '');
      });
    });

    describe('email masking', () => {
      test('masks local part of email predictably', () => {
        assert.equal(
          mask('john.doe@example.com', { type: 'email' }),
          'j******e@example.com'
        );
      });

      test('masks short local parts fully', () => {
        assert.equal(
          mask('me@example.com', { type: 'email' }),
          '**@example.com'
        );
        assert.equal(
          mask('a@example.com', { type: 'email' }),
          '*@example.com'
        );
      });

      test('falls back to generic when string is not an email', () => {
        assert.equal(
          mask('notanemail', { type: 'email' }),
          '******mail'
        );
      });
    });

    test('throws TypeError on invalid arguments', () => {
      assert.throws(() => mask(123), /Expected a string as input/);
      assert.throws(() => mask('test', { maskChar: '***' }), /Expected maskChar to be a single character/);
      assert.throws(() => mask('test', { maskChar: '' }), /Expected maskChar to be a single character/);
    });
  });
});
