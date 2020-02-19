"use strict";

module.exports = function (_ref) {
  var key = _ref.key,
      value = _ref.value;
  return "".concat(key, "=").concat(typeof value === 'string' ? "\"".concat(value, "\"") : "{".concat(value, "}"), " ");
};