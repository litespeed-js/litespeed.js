container.get('view').add({
    selector: 'data-ls-print',
    template: false,
    repeat: true,
    controller: function(element, expression, filter) {
        console.warn('data-ls-print is deprecated');

        var def             = element.getAttribute('data-default') || '';
        var filterName      = element.getAttribute('data-filter') || '';
        var filterOptions   = JSON.parse(element.getAttribute('data-filter-options') || '{}');
        var result          = expression.parse('{{' + element.dataset['lsPrint'] + '}}');

        result = result || def;

        if(filterName) {
            result = filter.apply(filterName, result);
        }

        if(
            element.tagName === 'INPUT' ||
            element.tagName === 'SELECT' ||
            element.tagName === 'BUTTON' ||
            element.tagName === 'TEXTAREA'
        ) {
            var type = element.getAttribute('type');

            if(('radio' === type) || ('checkbox' === type)) {
                if (result.toString() === element.value || result.indexOf(element.value) > -1) {
                    element.setAttribute('checked', 'checked');
                }
                else {
                    element.removeAttribute('checked');
                }
            }
            else {
                if(element.value !== result) {
                    element.value = result;
                }
                element.dispatchEvent(new window.Event('change'));
            }
        }
        else {
            if(element.innerText !== result) {
                element.innerText = result;
            }
        }
    }
});