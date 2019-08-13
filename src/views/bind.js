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

                    if(bind) {
                        element.addEventListener('change', () => {
                            for(let i = 0; i < paths.length; i++) {
                                if(element.checked) {
                                    value = element.value;
                                }

                                container.path(paths[i], value, $as, $prefix);
                            }
                        });
                    }

                    return;
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
                    }
                    else {
                        try {
                            value = JSON.parse(value);

                            element.checked = (Array.isArray(value) && (value.indexOf(element.value) > -1));

                            value = element.value;
                        }
                        catch {
                            return null;
                        }
                    }

                    if(bind) {
                        element.addEventListener('change', () => {
                            for(let i = 0; i < paths.length; i++) {
                                let value = container.path(paths[i], undefined, $as, $prefix);
                                let index = value.indexOf(element.value);

                                if(element.checked  && index < 0) {
                                    value.push(element.value);
                                }

                                if(!element.checked && index > -1) {
                                    value.splice(index, 1);
                                }

                                container.path(paths[i], value, $as, $prefix);
                            }
                        });
                    }

                    return;
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
            let path = paths[i].split('.');

            while(path.length) {
                container.bind(element, path.join('.'), () => {
                    echo(expression.parse(syntax, null, $as, $prefix), false);
                });
                path.pop();
            }
        }
    }
});
