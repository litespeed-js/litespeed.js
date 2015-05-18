
var view = require('view');

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
            path        = reference.join('.'),
            watch       = Object.path(service, path, undefined, true)
            ;

        Object.observe(watch, function(changes) {
            changes.forEach(function(change) {
                var value = Object.path(service, path);

                if(value != element.value) {
                    element.value = value;
                    console.log('updated', service);
                    console.log('changes', changes);
                }
            });
        });

        element.addEventListener('input', function() {
            Object.path(service, path, element.value);
            console.log('input', service);
        });

        element.value = Object.path(service, path);
    }
});