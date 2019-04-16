container.get('view').add({
    selector: 'data-ls-attrs',
    controller: function(element, expression, $as, $prefix) {
        let attrs   = element.getAttribute('data-ls-attrs').trim().split(',');
        let paths   = [];
        let check   = function () {
            for(let i = 0; i < attrs.length; i++) {
                let attr    = attrs[i].split('=');
                let key     = (attr[0]) ? expression.parse(attr[0], null, $as, $prefix) : null;

                paths = paths.concat(expression.getPaths());

                let value   = (attr[1]) ? expression.parse(attr[1], null, $as, $prefix) : null;

                paths = paths.concat(expression.getPaths());

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