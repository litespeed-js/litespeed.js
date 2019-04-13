container.get('view').add({
    selector: 'data-ls-bind',
    controller: function(element, expression, container) {
        let echo            = function(value) {
            if(
                element.tagName === 'INPUT' ||
                element.tagName === 'OPTION' ||
                element.tagName === 'SELECT' ||
                element.tagName === 'BUTTON' ||
                element.tagName === 'TEXTAREA'
            ) {
                let type = element.getAttribute('type');

                if ('radio' === type) {
                    if (value.toString() === def) {
                        element.setAttribute('checked', 'checked');
                    }
                    else {
                        element.removeAttribute('checked');
                    }
                }

                if('checkbox' === type) {
                    if(def.includes(value.toString())) {
                        element.setAttribute('checked', 'checked');
                    }
                    else {
                        element.removeAttribute('checked');
                    }
                }

                if (element.value !== value) {
                    element.value = value;
                }

                //element.dispatchEvent(new window.Event('change'));
                
                element.addEventListener('change', sync);
                element.addEventListener('keyup', sync);
            }
            else {
                if(element.innerText !== value) {
                    element.innerHTML = value;
                }
            }
        };
        let sync            = function () {
            container.path(paths[0], element.value);
        };
        let expr            = element.dataset['lsBind'];
        let result          = expression.parse(expr);
        let paths           = expression.getPaths();

        for(let i = 0; i < paths.length; i++) {
            //document.addEventListener(paths[i] + '.changed', function () {
            document.addEventListener(paths[i].split('.')[0] + '.changed', function () {
                echo(expression.parse(expr));
            });
        }

        echo(result);
    }
});