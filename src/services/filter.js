window.ls.container.set('filter', function(container) {
    let filters = {};

    let add = (name, callback) => {
        filters[name] = callback;
        return this;
    };

    let apply = (name, value) => {
        container.set('$value', value, true, false, false);
        return container.resolve(filters[name]);
    };

    add('uppercase', ($value) => {
        return $value.toUpperCase();
    });

    add('lowercase', ($value) => {
        return $value.toLowerCase();
    });

    return {
        add: add,
        apply: apply
    }
}, true, false);