const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const {
  isEmail,
  isUrl,
  isNumeric,
  isEmpty,
} = require('../src/validation.js');

describe('validation module', () => {
  describe('isEmail', () => {
    test('returns true for valid email formats', () => {
      assert.equal(isEmail('user@example.com'), true);
      assert.equal(isEmail('first.last@sub.domain.co.uk'), true);
      assert.equal(isEmail('user+filter@gmail.com'), true);
    });

    test('returns false for invalid email formats', () => {
      assert.equal(isEmail('not-an-email'), false);
      assert.equal(isEmail('user@'), false);
      assert.equal(isEmail('@example.com'), false);
      assert.equal(isEmail('user@domain'), false);
      assert.equal(isEmail('user@.com'), false);
      assert.equal(isEmail(''), false);
    });

    test('throws TypeError on non-string inputs', () => {
      assert.throws(() => isEmail(null), /Expected a string as input/);
      assert.throws(() => isEmail(123), /Expected a string as input/);
    });
  });

  describe('isUrl', () => {
    test('returns true for valid http and https URLs', () => {
      assert.equal(isUrl('https://example.com'), true);
      assert.equal(isUrl('http://localhost:3000/api/users?page=1'), true);
      assert.equal(isUrl('https://sub.domain.org/path#section'), true);
    });

    test('returns false for non-http(s) or malformed URLs', () => {
      assert.equal(isUrl('ftp://files.example.com'), false);
      assert.equal(isUrl('mailto:user@example.com'), false);
      assert.equal(isUrl('example.com'), false);
      assert.equal(isUrl('//cdn.example.com'), false);
      assert.equal(isUrl(''), false);
    });

    test('throws TypeError on non-string inputs', () => {
      assert.throws(() => isUrl(undefined), /Expected a string as input/);
    });
  });

  describe('isNumeric', () => {
    test('returns true for numeric strings', () => {
      assert.equal(isNumeric('42'), true);
      assert.equal(isNumeric('-123.45'), true);
      assert.equal(isNumeric('0'), true);
      assert.equal(isNumeric('1e5'), true);
      assert.equal(isNumeric('  99.9  '), true);
    });

    test('returns false for non-numeric and infinite values', () => {
      assert.equal(isNumeric('abc'), false);
      assert.equal(isNumeric('12a'), false);
      assert.equal(isNumeric('Infinity'), false);
      assert.equal(isNumeric('-Infinity'), false);
      assert.equal(isNumeric(''), false);
      assert.equal(isNumeric('   '), false);
    });

    test('throws TypeError on non-string inputs', () => {
      assert.throws(() => isNumeric(42), /Expected a string as input/);
    });
  });

  describe('isEmpty', () => {
    test('correctly identifies empty strings with default trimming', () => {
      assert.equal(isEmpty(''), true);
      assert.equal(isEmpty('   '), true);
      assert.equal(isEmpty('\t\n\r'), true);
      assert.equal(isEmpty('hello'), false);
    });

    test('respects trimWhitespace = false', () => {
      assert.equal(isEmpty('   ', false), false);
      assert.equal(isEmpty('', false), true);
    });

    test('throws TypeError on invalid arguments', () => {
      assert.throws(() => isEmpty(null), /Expected a string as input/);
      assert.throws(() => isEmpty('test', 'yes'), /Expected trimWhitespace to be a boolean/);
    });
  });
});
