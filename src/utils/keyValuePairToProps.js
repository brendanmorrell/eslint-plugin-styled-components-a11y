const { __UNKNOWN_IDENTIFER__ } = require('./constants');

module.exports = ({ key, value }) =>
  // we set all attributes which are variable identifiers as '__UNKNOWN_IDENTIFER__' just so there can be some value for the kv pair since we have no way of knowing the real value.
  //  thus, here we want to just plug that string in without any quotes so the linter treats it just like a variable would have been handled normally
  `${key}=${typeof value !== 'string' || value === __UNKNOWN_IDENTIFER__ ? `{${value}}` : `"${value}"`} `;
