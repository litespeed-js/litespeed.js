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

        if(
            element.tagName == 'INPUT' ||
            element.tagName == 'SELECT' ||
            element.tagName == 'BUTTON' ||
            element.tagName == 'TEXTAREA'
        ) {
            element.value = Object.path(service, path);
        }
        else {
            element.innerHTML = Object.path(service, path);
        }
    }
});