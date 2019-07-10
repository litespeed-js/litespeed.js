window.ls.container.get('view').add({
    selector: 'data-ls-bind',
    controller: function(element, expression, container, $prefix, $as) {
        let echo = function(value, bind = true) {
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
                    if(typeof value === 'boolean' || value === 'true' || value === 'false') {
                        if(value === true || value === 'true') {
                            element.setAttribute('checked', 'checked');
                            element.checked = true;
                        }
                        else {
                            element.removeAttribute('checked');
                            element.checked = false;
                        }

                        if(bind) {
                            element.addEventListener('change', () => {
                                for(let i = 0; i < paths.length; i++) {
                                    container.path(paths[i], element.checked, $as, $prefix);
                                }
                            });
                        }
                    }
                    else {
                        try {
                            value = JSON.parse(value);

                            element.checked = (Array.isArray(value) && (value.indexOf(element.value) > -1));
                        }
                        catch {
                            return null;
                        }
                    }
                }

                if (element.value !== value) {
                    element.value = value;
                }

                if(bind) {
                    element.addEventListener('input', sync);
                    element.addEventListener('change', sync);
                }
            }
            else {
                if(element.innerText !== value) {
                    element.innerHTML = value;
                }
            }
        };
        let sync = ((as, prefix) => {
            return () => {
                for(let i = 0; i < paths.length; i++) {
                    container.path(paths[i], element.value, as, prefix);
                }
            }
        })($as, $prefix);

        let syntax = element.getAttribute('data-ls-bind');
        let result = expression.parse(syntax, null, $as, $prefix);
        let paths  = expression.getPaths();

        echo(result, true);

        element.addEventListener('looped', function () { // Rebind after loop comp finish to render
            echo(expression.parse(syntax, null, $as, $prefix), false);
        });

        for(let i = 0; i < paths.length; i++) {
            container.bind(element, paths[i], () => {
                echo(expression.parse(syntax, null, $as, $prefix), false);
            });
        }
    }
});
