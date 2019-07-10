window.ls.container.get('view').add({
    selector: 'data-ls-template',
    template: false,
    repeat: true,
    controller: function(element, view, http, expression, document) {
        let template    = expression.parse(element.getAttribute('data-ls-template'));
        let type        = element.getAttribute('data-type') || 'url';

        element.innerHTML = '';

        if('script' === type) {
            let inlineTemplate = document.getElementById(template);

            if(inlineTemplate && inlineTemplate.innerHTML) {
                element.innerHTML = inlineTemplate.innerHTML;

                element.dispatchEvent(new CustomEvent('template-loaded', {
                    bubbles: true,
                    cancelable: false //TODO check if we need this set to false or true. might help improve performance
                }));
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
    }
});