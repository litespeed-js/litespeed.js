/**
 * View
 *
 * Manage application scopes and different views
 */
container.set('filter', function(container) {
    let filters = {};

    let add = function (name, callback) {
        filters[name] = callback;
        return this;
    };

    let apply = function (value, name) {
        container.set('$value', value, true);
        return container.resolve(filters[name]);
    };

    add('uppercase', function (value) {
        return value.toUpperCase();
    });

    add('lowercase', function (value) {
        return value.toLowerCase();
    });

    return {
        add: add,
        apply: apply
    }
}, true);