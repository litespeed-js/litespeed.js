container.get('view').add({
    selector: 'data-ls-attr',
    template: false,
    repeat: true,
    controller: function(element, expression) {
        let attrs = element.dataset['lsAttr'].trim().split(',');

        console.log(attrs);

        for(let i = 0; i < attrs.length; i++) {
            let attr    = attrs[i].split('=');
            let key     = (attr[0]) ? attr[0] : null;
            let value   = (attr[1]) ? attr[1] : null;

            if(!key) {
                return null;
            }

            element.setAttribute(key, value);
        }

    }
});