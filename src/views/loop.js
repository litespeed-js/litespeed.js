
var view = require('view');

view.add({
    name: 'ls-loop',
    selector: '[data-ls-loop]',
    isomorphic: true,
    template: false,
    controller: function(element) {

        var reference   = element.dataset['lsLoop'].replace('[\'', '.').replace('\']', '').split('.'), // Make syntax consistent using only dot nesting
            template    = element.innerHTML,
            service     = container.get(reference.shift()),
            path        = reference.join('.'),
            array       = Object.path(service, path),
            output      = ''
            ;

        if(typeof array !== 'array' && typeof array !== 'object') {
            throw new Error('Reference \'' + path + '\' value must be array or object. ' + (typeof array) + ' given');
        }

        var txt = "This is [my] simple text and [this is] another example";
        var re = (/[^[\]]+(?=])/g);
        //console.log(txt.match(re));

        for (var i = 0; i < array.length; i++) {
            //console.log(template);
            output += template
                .replace(/{{ /g, '{{')
                .replace(/ }}/g, '}}')
                .replace(/{{value}}/g, array[i])
                .replace(/{{key}}/g, i)
            ;
        }

        //TODO on service change - recalculate output

        element.innerHTML = output;
    }
});