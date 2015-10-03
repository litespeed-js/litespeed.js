view.add({
    name: 'ls-bind',
    selector: 'data-ls-bind',
    template: false,
    controller: function(element, container) {
        var reference   = element.dataset['lsBind']
                .replace('[\'', '.')
                .replace('\']', '')
                .split('.'), // Make syntax consistent using only dot nesting
            service     = container.get(reference.shift()),
            path        = reference.join('.')
        ;

        Object.observeNested(service, function(changes) {
            changes.forEach(function(change) {
                var value = Object.path(service, path);

                var key = (
                    (element.type == 'button') ||
                    (element.type == 'checkbox') ||
                    (element.type == 'color') ||
                    (element.type == 'date') ||
                    (element.type == 'datetime') ||
                    (element.type == 'datetime-local') ||
                    (element.type == 'email') ||
                    (element.type == 'file') ||
                    (element.type == 'hidden') ||
                    (element.type == 'image') ||
                    (element.type == 'month') ||
                    (element.type == 'number') ||
                    (element.type == 'password') ||
                    (element.type == 'radio') ||
                    (element.type == 'range') ||
                    (element.type == 'reset') ||
                    (element.type == 'search') ||
                    (element.type == 'submit') ||
                    (element.type == 'tel') ||
                    (element.type == 'text') ||
                    (element.type == 'time') ||
                    (element.type == 'url') ||
                    (element.type == 'week') ||
                    (element.type == 'textarea')
                ) ? 'value' : 'innerText';

                if(value != element[key]) {
                    element[key] = value;
                }
            });
        });

        element.addEventListener('input', function() {
            Object.path(service, path, element.value);
        });

        element.value = Object.path(service, path);
    }
});