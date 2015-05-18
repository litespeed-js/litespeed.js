
var view = require('view');

view.add({
    name: 'ls-loop',
    selector: 'data-ls-loop',
    template: false,
    controller: function(element) {

        var reference   = element.dataset['lsLoop'].replace('[\'', '.').replace('\']', '').split('.'), // Make syntax consistent using only dot nesting
            template    = element.innerHTML,
            service     = container.get(reference.shift()),
            path        = reference.join('.'),
            array       = Object.path(service, path),
            watch       = Object.path(service, path, undefined, true),
            render      = function(element, array) {
                var output = '';

                for (var i = 0; i < array.length; i++) {
                    //console.log(template);
                    output += template
                        .replace(/{{ /g, '{{')
                        .replace(/ }}/g, '}}')
                        .replace(/{{value}}/g, array[i])
                        .replace(/{{key}}/g, i)
                    ;
                }

                element.innerHTML = output;
            }
            ;

        if(typeof array !== 'array' && typeof array !== 'object') {
            throw new Error('Reference \'' + path + '\' value must be array or object. ' + (typeof array) + ' given');
        }

        render(element, array);

        Object.observe(watch, function(changes) {
            render(element, array);
        });
    }
});