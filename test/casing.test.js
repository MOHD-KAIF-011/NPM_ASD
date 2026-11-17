const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const {
  camelCase,
  kebabCase,
  snakeCase,
  pascalCase,
  titleCase,
} = require('../src/casing.js');

describe('casing module', () => {
  describe('camelCase', () => {
    test('transforms standard spaced words', () => {
      assert.equal(camelCase('hello world'), 'helloWorld');
    });

    test('transforms kebab-case and snake_case', () => {
      assert.equal(camelCase('foo-bar-baz'), 'fooBarBaz');
      assert.equal(camelCase('foo_bar_baz'), 'fooBarBaz');
    });

    test('handles mixed delimiters and excessive whitespace', () => {
      assert.equal(camelCase('  ---foo___bar---baz  '), 'fooBarBaz');
    });

    test('handles numbers in string', () => {
      assert.equal(camelCase('123 numbers test'), '123NumbersTest');
    });

    test('handles empty and whitespace strings', () => {
      assert.equal(camelCase(''), '');
      assert.equal(camelCase('   '), '');
    });

    test('throws TypeError on non-string inputs', () => {
      assert.throws(() => camelCase(null), /Expected a string as input/);
      assert.throws(() => camelCase(undefined), /Expected a string as input/);
      assert.throws(() => camelCase(123), /Expected a string as input/);
      assert.throws(() => camelCase({}), /Expected a string as input/);
    });
  });

  describe('kebabCase', () => {
    test('transforms standard spaced words', () => {
      assert.equal(kebabCase('hello world'), 'hello-world');
    });

    test('transforms camelCase and PascalCase', () => {
      assert.equal(kebabCase('camelCaseText'), 'camel-case-text');
      assert.equal(kebabCase('PascalCaseText'), 'pascal-case-text');
    });

    test('handles empty and whitespace strings', () => {
      assert.equal(kebabCase(''), '');
      assert.equal(kebabCase('   '), '');
    });

    test('throws TypeError on non-string inputs', () => {
      assert.throws(() => kebabCase(null), /Expected a string as input/);
      assert.throws(() => kebabCase(undefined), /Expected a string as input/);
    });
  });

  describe('snakeCase', () => {
    test('transforms standard words', () => {
      assert.equal(snakeCase('hello world'), 'hello_world');
    });

    test('transforms camelCase and kebab-case', () => {
      assert.equal(snakeCase('fooBar'), 'foo_bar');
      assert.equal(snakeCase('foo-bar-baz'), 'foo_bar_baz');
    });

    test('handles empty and whitespace strings', () => {
      assert.equal(snakeCase(''), '');
      assert.equal(snakeCase('   '), '');
    });

    test('throws TypeError on non-string inputs', () => {
      assert.throws(() => snakeCase([]), /Expected a string as input/);
    });
  });

  describe('pascalCase', () => {
    test('transforms standard words', () => {
      assert.equal(pascalCase('hello world'), 'HelloWorld');
    });

    test('transforms kebab and snake cases', () => {
      assert.equal(pascalCase('foo-bar'), 'FooBar');
      assert.equal(pascalCase('foo_bar_baz'), 'FooBarBaz');
    });

    test('handles empty and whitespace strings', () => {
      assert.equal(pascalCase(''), '');
      assert.equal(pascalCase('   '), '');
    });

    test('throws TypeError on non-string inputs', () => {
      assert.throws(() => pascalCase(false), /Expected a string as input/);
    });
  });

  describe('titleCase', () => {
    test('capitalizes words correctly', () => {
      assert.equal(titleCase('hello world'), 'Hello World');
    });

    test('keeps minor words lowercase unless first word', () => {
      assert.equal(
        titleCase('the old man and the sea'),
        'The Old Man and the Sea'
      );
      assert.equal(
        titleCase('a tale of two cities'),
        'A Tale of Two Cities'
      );
    });

    test('handles empty and whitespace strings', () => {
      assert.equal(titleCase(''), '');
      assert.equal(titleCase('   '), '');
    });

    test('throws TypeError on non-string inputs', () => {
      assert.throws(() => titleCase(42), /Expected a string as input/);
    });
  });
});
