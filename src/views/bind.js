window.ls.container.get('view').add({
    selector: 'data-ls-bind',
    controller: function(element, expression, container) {
        let debug = element.getAttribute('data-debug') || false;
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

                                container.path(paths[i], value);
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
                                let value = container.path(paths[i]);
                                let index = value.indexOf(element.value);

                                if(element.checked  && index < 0) {
                                    value.push(element.value);
                                }

                                if(!element.checked && index > -1) {
                                    value.splice(index, 1);
                                }

                                container.path(paths[i], value);
                            }
                        });
                    }

                    return;
                }

                if (element.value !== value) {
                    element.value = value;
                    element.dispatchEvent(new Event('change'));
                }

                if(bind) {
                    element.addEventListener('input', sync);
                    element.addEventListener('change', sync);
                }
            }
            else {
                if(element.textContent != value) {
                    element.textContent = value;
                }
            }
        };
        let sync = (() => {
            return () => {
                if(debug) {
                    console.info('debug-ls-bind', 'sync-path', paths);
                    console.info('debug-ls-bind', 'sync-syntax', syntax);
                    console.info('debug-ls-bind', 'sync-syntax-parsed', parsedSyntax);
                    console.info('debug-ls-bind', 'sync-value',element.value);
                }

                for(let i = 0; i < paths.length; i++) {
                    if('{{' + paths[i] + '}}' !== parsedSyntax) { // Sync only direct path
                        if(debug) {
                            console.info('debug-ls-bind', 'sync-skipped-path', paths[i]);
                            console.info('debug-ls-bind', 'sync-skipped-syntax', syntax);
                            console.info('debug-ls-bind', 'sync-skipped-syntax-parsed', parsedSyntax);
                        }

                        continue;
                    }

                    if(debug) {
                        console.info('debug-ls-bind', 'sync-loop-path', paths[i]);
                        console.info('debug-ls-bind', 'sync-loop-syntax', parsedSyntax);
                    }

                    container.path(paths[i], element.value);
                }
            }
        })();

        let syntax = element.getAttribute('data-ls-bind');
        let parsedSyntax = container.scope(syntax);
        let unsync = (!!element.getAttribute('data-unsync')) || false;
        let result = expression.parse(syntax);
        let paths  = expression.getPaths();

        echo(result, !unsync);

        element.addEventListener('looped', function () { // Rebind after loop comp finish to render
            echo(expression.parse(parsedSyntax), false);
        });

        for(let i = 0; i < paths.length; i++) {
            let path = paths[i].split('.');

            if(debug) {
                console.info('debug-ls-bind', 'bind-path', path);
                console.info('debug-ls-bind', 'bind-syntax', syntax);
            }

            while(path.length) {
                container.bind(element, path.join('.'), () => {
                    echo(expression.parse(parsedSyntax), false);
                });
                path.pop();
            }
        }
    }
});
