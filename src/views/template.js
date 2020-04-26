window.ls.container.get('view').add({
    selector: 'data-ls-template',
    template: false,
    repeat: false,
    controller: function(element, view, http, expression, document, container) {
        let template    = element.getAttribute('data-ls-template') || '';
        let type        = element.getAttribute('data-type') || 'url';
        let debug       = element.getAttribute('data-debug') || false;
        let paths       = [];
        let check       = function(init = false) {
            let source = expression.parse(template);
            paths= expression.getPaths();
            element.innerHTML = '';

            if('script' === type) {
                let inlineTemplate = document.getElementById(source);

                if(inlineTemplate && inlineTemplate.innerHTML) {
                    element.innerHTML = inlineTemplate.innerHTML;

                    element.dispatchEvent(new CustomEvent('template-loaded', {
                        bubbles: true,
                        cancelable: false //TODO check if we need this set to false or true. might help improve performance
                    }));
                }
                else {
                    if(debug) {
                        console.error('Missing template "' + source + '"');
                    }
                }

                if(!init) {
                    view.render(element);
                }

                return;
            }

            http
                .get(source)
                .then(function(element) {
                        return function (data) {
                            element.innerHTML = data;

                            view.render(element);

                            element.dispatchEvent(new CustomEvent('template-loaded', {
                                bubbles: true,
                                cancelable: false //TODO check if we need this set to false or true. might help improve performance
                            }));
                        }
                    }(element),
                    function() {
                        throw new Error('Failed loading template');
                    }
                );  
        };

        check(true);

        for(let i = 0; i < paths.length; i++) {
            let path = paths[i].split('.');
            
            while(path.length) {
                container.bind(element, path.join('.'), check);
                path.pop();
            }
        }
    }
});