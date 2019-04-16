container.get('view').add({
    selector: 'data-ls-bind',
    controller: function(element, expression, container, $prefix, $as) {
        let echo            = function(value, bind = true) {
            if(
                element.tagName === 'INPUT' ||
                element.tagName === 'SELECT' ||
                element.tagName === 'BUTTON' ||
                element.tagName === 'TEXTAREA'
            ) {
                let type = element.getAttribute('type');

                if ('radio' === type) {
                    if (value.toString() === element.value) {
                        element.setAttribute('checked', 'checked');
                    }
                    else {
                        element.removeAttribute('checked');
                    }
                }

                if('checkbox' === type) {
                    value = JSON.parse(value);

                    if(typeof value === 'boolean') {
                        if(value === true) {
                            element.setAttribute('checked', 'checked');
                            element.value = true;
                        }
                        else {
                            element.removeAttribute('checked');
                            element.value = false;
                        }

                        if(bind) {
                            element.addEventListener('change', function () {
                                for(let i = 0; i < paths.length; i++) {
                                    container.path(paths[i], element.checked, $as, $prefix);
                                }
                            });
                        }
                    }

                    return;

                    // add support to checkbox array
                }

                if (element.value !== value) {
                    element.value = value;
                }

                if(bind) {
                    element.addEventListener('input', sync);
                }
            }
            else {
                if(element.innerText !== value) {
                    element.innerHTML = value;
                }
            }
        };
        let sync = (function (as, prefix) {
            return function () {
                for(let i = 0; i < paths.length; i++) {
                    container.path(paths[i], element.value, as, prefix);
                }
            }
        })($as, $prefix);

        let syntax          = element.getAttribute('data-ls-bind');
        let result          = expression.parse(syntax, null, $as, $prefix);
        let paths           = expression.getPaths();

        for(let i = 0; i < paths.length; i++) {
            container.bind(element, paths[i], function () {
                echo(expression.parse(syntax, null, $as, $prefix), false);
            });
        }

        echo(result, true);
    }
});