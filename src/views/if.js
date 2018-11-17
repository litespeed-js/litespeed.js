container.get('view').add({
    selector: 'data-ls-if',
    template: false,
    repeat: true,
    controller: function(element, expression) {
        let result = '';

        try {
            result = !!(eval(expression.parse(element.dataset['lsIf'], 'undefined')));
        }
        catch (error) {
            throw new Error('Failed to evaluate expression: '.error.message);
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