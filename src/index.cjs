const casing = require('./casing.js');
const formatting = require('./formatting.js');
const sanitization = require('./sanitization.js');
const metrics = require('./metrics.js');
const validation = require('./validation.js');

const strCraftKit = {
  ...casing,
  ...formatting,
  ...sanitization,
  ...metrics,
  ...validation,
};

module.exports = strCraftKit;
module.exports.default = strCraftKit;
