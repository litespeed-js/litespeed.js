container.get('view').add({
    selector: 'data-ls-template',
    template: false,
    repeat: true,
    controller: function(element, view, http, expression, document) {
        let template    = expression.parse(element.getAttribute('data-ls-template'));
        let type        = element.getAttribute('data-type') || 'url';

        element.innerHTML = '';

        let parse = function (data, element) {
            element.innerHTML = data;

            view.render(element);

            element.dispatchEvent(new CustomEvent('template-loaded', {
                bubbles: true,
                cancelable: false //TODO check if we need this set to false or true. might help improve performance
            }));
        };

        if('script' === type) {
            let inlineTemplate = document.getElementById(template);

            if(inlineTemplate && inlineTemplate.innerHTML) {
                parse(inlineTemplate.innerHTML, element);
            }
            else {
                element.innerHTML = '<span style="color: red">Missing template "' + template + '"</span>';
            }

            return;
        }

        http
            .get(template)
            .then(function(element) {
                    return function (data) {
                        parse(data, element);
                    }
                }(element),
                function() {
                    throw new Error('Failed loading template');
                }
            );
    }
});