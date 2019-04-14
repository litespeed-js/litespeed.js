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
                                container.path(path, element.checked, $as, $prefix);
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
                container.path(path, element.value, as, prefix);
            }
        })($as, $prefix);

        let path            = element.dataset['lsBind'];
        let result          = container.path(path);

        container.bind(element, path, function () {
            echo(container.path(path, undefined, $as, $prefix), false);
        });

        echo(result, true);
    }
});