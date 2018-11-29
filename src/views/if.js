container.get('view').add({
    selector: 'data-ls-if',
    template: false,
    repeat: true,
    controller: function(element, expression) {
        let result = '';
        let syntax = element.dataset['lsIf'] || '';

        try {
            result = !!(eval(expression.parse(syntax, 'undefined')));
        }
        catch (error) {
            throw new Error('Failed to evaluate expression "' + syntax + '": ' + error);
        }

        element.$lsSkip = !result;

        if(!result) {
            element.style.visibility = 'hidden';
            element.style.display = 'none';
        }
        else {
            element.style.removeProperty('display');
            element.style.removeProperty('visibility');
        }
    }
});