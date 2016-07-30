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
            path        = reference.join('.');

        element.innerHTML = Object.path(service, path);
    }
});