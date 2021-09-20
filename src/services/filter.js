window.ls.container.set('filter', function(container) {
    let filters = {};

    let add = function(name, callback) {
        filters[name] = callback;
        return this;
    };

    let apply = function(name, value) {
        container.set('$value', value, true, false);
        return container.resolve(filters[name]);
    };

    add('uppercase', ($value) => {
        if (typeof $value !== 'string') {
            return $value;
        }

        return $value.toUpperCase();
    });

    add('lowercase', ($value) => {
        if (typeof $value !== 'string') {
            return $value;
        }

        return $value.toLowerCase();
    });

    return {
        add: add,
        apply: apply
    }
}, true, false);