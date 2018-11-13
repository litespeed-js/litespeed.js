container.get('view').add({
    selector: 'data-ls-echo',
    template: false,
    repeat: true,
    controller: function(element, expression, filter) {
        var def             = expression.parse(element.getAttribute('data-default') || '');
        var filterName      = element.getAttribute('data-filter') || '';
        var filterOptions   = JSON.parse(element.getAttribute('data-filter-options') || '{}');
        var result          = expression.parse(element.dataset['lsEcho']);

        result = result || def;

        if(filterName) {
            result = filter.apply(result, filterName, filterOptions);
        }

        if(
            element.tagName === 'INPUT' ||
            element.tagName === 'OPTION' ||
            element.tagName === 'SELECT' ||
            element.tagName === 'BUTTON' ||
            element.tagName === 'TEXTAREA'
        ) {
            var type = element.getAttribute('type');

            if ('radio' === type) {
                if (result.toString() === def) {
                    element.setAttribute('checked', 'checked');
                }
                else {
                    element.removeAttribute('checked');
                }
            }

            if('checkbox' === type) {
                if(def.includes(result.toString())) {
                    element.setAttribute('checked', 'checked');
                }
                else {
                    element.removeAttribute('checked');
                }
            }

            if (element.value !== result) {
                element.value = result;
            }

            element.dispatchEvent(new window.Event('change'));
        }
        else {
            if(element.innerText !== result) {
                element.innerHTML = result;
            }
        }
    }
});