/**
 * View
 *
 * Manage application scopes and different views
 */
container.set('filter', function() {
    var filters = {};

    var add = function (name, callback) {
        filters[name] = callback;
        return this;
    };

    var apply = function (value, name, options) {
        return filters[name](value, options);
    };

    add('uppercase', function (value, options) {
        return value.toUpperCase();
    });

    add('lowercase', function (value, options) {
        return value.toLowerCase();
    });

    return {
        add: add,
        apply: apply
    }
}, true);