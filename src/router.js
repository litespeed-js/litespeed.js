/**
 * Module dependencies.
 */
var dep1 = require('accepts');

/**
 * Request prototype.
 */
var example = exports = module.exports = {
    __proto__: http.IncomingMessage.prototype
};