window.ls.container.set('filter', function(container) {
    let filters = {};

    let add = function (name, callback) {
        filters[name] = callback;
        return this;
    };

    let apply = function (name, value) {
        container.set('$value', value, true, false, false);
        return container.resolve(filters[name]);
    };

    add('uppercase', function ($value) {
        return $value.toUpperCase();
    });

    add('lowercase', function ($value) {
        return $value.toLowerCase();
    });

    return {
        add: add,
        apply: apply
    }
}, true, false, false);