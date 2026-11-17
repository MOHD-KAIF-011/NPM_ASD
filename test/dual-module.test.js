const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const EXPECTED_FUNCTIONS = [
  'camelCase',
  'kebabCase',
  'snakeCase',
  'pascalCase',
  'titleCase',
  'slugify',
  'truncate',
  'mask',
  'escapeHtml',
  'unescapeHtml',
  'stripHtml',
  'wordCount',
  'readingTime',
  'isEmail',
  'isUrl',
  'isNumeric',
  'isEmpty',
];

describe('dual module export integrity', () => {
  test('CommonJS entrypoint exports all functions and default', () => {
    const cjs = require('../src/index.cjs');

    for (const fnName of EXPECTED_FUNCTIONS) {
      assert.equal(
        typeof cjs[fnName],
        'function',
        `Expected ${fnName} to be exported from CommonJS entrypoint`
      );
    }

    assert.equal(typeof cjs.default, 'object');
    assert.equal(cjs.slugify('Hello CJS'), 'hello-cjs');
    assert.equal(cjs.isEmail('test@example.com'), true);
  });

  test('ESM entrypoint exports all functions and default', async () => {
    const esm = await import('../src/index.mjs');

    for (const fnName of EXPECTED_FUNCTIONS) {
      assert.equal(
        typeof esm[fnName],
        'function',
        `Expected ${fnName} to be exported from ESM entrypoint`
      );
    }

    assert.equal(typeof esm.default, 'object');
    assert.equal(esm.slugify('Hello ESM'), 'hello-esm');
    assert.equal(esm.isEmail('test@example.com'), true);
  });
});
