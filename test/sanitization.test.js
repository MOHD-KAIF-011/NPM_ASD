const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { escapeHtml, unescapeHtml, stripHtml } = require('../src/sanitization.js');

describe('sanitization module', () => {
  describe('escapeHtml', () => {
    test('escapes special characters correctly', () => {
      assert.equal(
        escapeHtml('Tom & Jerry <"classic"> \'cartoon\''),
        'Tom &amp; Jerry &lt;&quot;classic&quot;&gt; &#39;cartoon&#39;'
      );
    });

    test('returns unchanged string when no special characters are present', () => {
      assert.equal(escapeHtml('Hello World 123'), 'Hello World 123');
    });

    test('handles empty string', () => {
      assert.equal(escapeHtml(''), '');
    });

    test('throws TypeError on non-string inputs', () => {
      assert.throws(() => escapeHtml(null), /Expected a string as input/);
      assert.throws(() => escapeHtml(undefined), /Expected a string as input/);
      assert.throws(() => escapeHtml({}), /Expected a string as input/);
    });
  });

  describe('unescapeHtml', () => {
    test('unescapes named and numeric entities', () => {
      assert.equal(
        unescapeHtml('&lt;div&gt;Hello &amp; welcome&lt;/div&gt; &#39;Kaif&#39; &#x27;Test&#x27;'),
        '<div>Hello & welcome</div> \'Kaif\' \'Test\''
      );
    });

    test('leaves unknown entities untouched', () => {
      assert.equal(unescapeHtml('&custom; &nbsp;'), '&custom; &nbsp;');
    });

    test('handles empty string', () => {
      assert.equal(unescapeHtml(''), '');
    });

    test('throws TypeError on non-string inputs', () => {
      assert.throws(() => unescapeHtml(123), /Expected a string as input/);
    });
  });

  describe('stripHtml', () => {
    test('removes basic tags and preserves text', () => {
      assert.equal(stripHtml('<p>Hello <b>World</b>!</p>'), 'Hello World!');
    });

    test('removes script and style tags along with their inner contents', () => {
      assert.equal(
        stripHtml('<script>alert("xss")</script><p>Clean content</p><style>body { color: red; }</style>'),
        'Clean content'
      );
    });

    test('preserves spacing between block-level tags', () => {
      assert.equal(
        stripHtml('<div>First Block</div><p>Second Block</p>'),
        'First Block Second Block'
      );
    });

    test('handles empty and plain strings', () => {
      assert.equal(stripHtml(''), '');
      assert.equal(stripHtml('Plain text without tags'), 'Plain text without tags');
    });

    test('throws TypeError on non-string inputs', () => {
      assert.throws(() => stripHtml(false), /Expected a string as input/);
    });
  });
});
