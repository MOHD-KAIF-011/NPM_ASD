const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { wordCount, readingTime } = require('../src/metrics.js');

describe('metrics module', () => {
  describe('wordCount', () => {
    test('counts words in regular sentences', () => {
      assert.equal(wordCount('The quick brown fox jumps over the lazy dog'), 9);
    });

    test('handles multiple spaces, tabs, and newlines', () => {
      assert.equal(wordCount('one \t\n two   \r\n three'), 3);
    });

    test('handles empty and whitespace-only strings', () => {
      assert.equal(wordCount(''), 0);
      assert.equal(wordCount('     '), 0);
    });

    test('throws TypeError on non-string inputs', () => {
      assert.throws(() => wordCount(null), /Expected a string as input/);
      assert.throws(() => wordCount(123), /Expected a string as input/);
    });
  });

  describe('readingTime', () => {
    test('returns 0 for empty or whitespace strings', () => {
      const result = readingTime('');
      assert.deepEqual(result, {
        words: 0,
        minutes: 0,
        timeMs: 0,
        formatted: '0 min read',
      });
    });

    test('returns minimum 1 min read for small word counts', () => {
      const result = readingTime('A quick brown fox');
      assert.equal(result.words, 4);
      assert.equal(result.minutes, 1);
      assert.equal(result.timeMs, 1200);
      assert.equal(result.formatted, '1 min read');
    });

    test('calculates correct time for larger texts', () => {
      // 500 words at 200 wpm => 2.5 minutes => Math.ceil = 3 minutes
      const text = new Array(500).fill('word').join(' ');
      const result = readingTime(text, 200);
      assert.equal(result.words, 500);
      assert.equal(result.minutes, 3);
      assert.equal(result.timeMs, 150000);
      assert.equal(result.formatted, '3 min read');
    });

    test('supports custom wordsPerMinute', () => {
      // 100 words at 100 wpm => 1 minute
      const text = new Array(100).fill('word').join(' ');
      const result = readingTime(text, 100);
      assert.equal(result.words, 100);
      assert.equal(result.minutes, 1);
      assert.equal(result.timeMs, 60000);
      assert.equal(result.formatted, '1 min read');
    });

    test('throws TypeError on invalid wordsPerMinute', () => {
      assert.throws(() => readingTime('hello', 0), /Expected wordsPerMinute to be a positive number/);
      assert.throws(() => readingTime('hello', -10), /Expected wordsPerMinute to be a positive number/);
      assert.throws(() => readingTime('hello', NaN), /Expected wordsPerMinute to be a positive number/);
      assert.throws(() => readingTime('hello', '200'), /Expected wordsPerMinute to be a positive number/);
    });

    test('throws TypeError on non-string text', () => {
      assert.throws(() => readingTime(undefined), /Expected a string as input/);
    });
  });
});
