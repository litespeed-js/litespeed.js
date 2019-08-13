window.ls.container.get('view').add({
    selector: 'data-ls-attrs',
    controller: function(element, expression, container, $as, $prefix) {
        let attrs   = element.getAttribute('data-ls-attrs').trim().split(',');
        let paths   = [];
        let check   = () => {
            for(let i = 0; i < attrs.length; i++) {
                let attr    = attrs[i];

                let key = expression.parse((attr.substring(0, attr.indexOf('=')) || attr), null, $as, $prefix);

                paths = paths.concat(expression.getPaths());

                let value = '';

                if(attr.indexOf('=') > -1) { // if value is actually set
                    value = expression.parse(attr.substring(attr.indexOf('=') + 1), null, $as, $prefix) || '';
                    paths = paths.concat(expression.getPaths());
                }

                if(!key) {
                    return null;
                }

                element.setAttribute(key, value);
            }
        };

        check();

        for(let i = 0; i < paths.length; i++) {
            container.bind(element, paths[i], check);
        }
    }
});