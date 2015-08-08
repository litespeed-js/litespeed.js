view.add({
    name: 'ls-placeholder',
    selector: 'data-ls-placeholder',
    template: false,
    controller: function(element, container) {
        var reference   = element.dataset['lsPlaceholder']
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

                if(value != element.innerHTML) {
                    element.innerHTML = value;
                    console.log('updated', service);
                    console.log('changes', changes);
                }
            });
        });

        element.innerHTML = Object.path(service, path);
    }
});