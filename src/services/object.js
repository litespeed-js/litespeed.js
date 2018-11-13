Object.path = function(object, path, value) {
    path = path.split('.');

    // Iterating path
    while (path.length > 1) {
        if(undefined === object) {
            return null;
        }

        object = object[path.shift()];
    }

    // Set new value
    if(undefined !== value) {
        return object[path.shift()] = value;
    }

    // Return null when missing path
    if(undefined === object) {
        return null;
    }

    return object[path.shift()];
};

if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement /*, fromIndex*/) {
        'use strict';
        if (this == null) {
            throw new TypeError('Array.prototype.includes called on null or undefined');
        }

        var O = Object(this);
        var len = parseInt(O.length, 10) || 0;
        if (len === 0) {
            return false;
        }
        var n = parseInt(arguments[1], 10) || 0;
        var k;
        if (n >= 0) {
            k = n;
        } else {
            k = len + n;
            if (k < 0) {k = 0;}
        }
        var currentElement;
        while (k < len) {
            currentElement = O[k];
            if (searchElement === currentElement ||
                (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
                return true;
            }
            k++;
        }
        return false;
    };
}