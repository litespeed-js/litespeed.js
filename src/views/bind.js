container.get('view').add({
    selector: 'data-ls-bind',
    controller: function(element, expression, container, $prefix, $as) {
        let echo            = function(value) {
            if(
                element.tagName === 'INPUT' ||
                //element.tagName === 'OPTION' ||
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

                        element.addEventListener('change', function () {
                            console.log(element.checked, path);
                            container.path(path, element.checked);
                        });
                    }

                    return;

                    // add support to checkbox array
                }

                if (element.value !== value) {
                    element.value = value;
                }

                element.addEventListener('input', sync);
            }
            else {
                if(element.innerText !== value) {
                    element.innerHTML = value;
                }
            }
        };
        let sync            = function () {
            container.path(path, element.value);
        };
        let path            = element.dataset['lsBind'];
        let result          = container.path(path);

        path = path.replace($as, $prefix);

        //document.addEventListener(path.split('.')[0] + '.changed', function () {
        document.addEventListener(path + '.changed', function () {
            echo(container.path(path));
        });

        echo(result);
    }
});