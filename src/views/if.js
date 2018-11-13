container.get('view').add({
    selector: 'data-ls-if',
    template: false,
    repeat: true,
    controller: function(element, expression) {
        var result = !!(eval(expression.parse(element.dataset['lsIf'], 'undefined')));

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