container.get('view').add({
    selector: 'data-ls-selected',
    template: false,
    repeat: true,
    controller: function(element, expression) {
        var result  = !!(eval(expression.parse(element.dataset['lsSelected'])));

        element.$lsSkip = !result;

        if(!result) {
            element.classList.remove('selected');
        }
        else {
            element.classList.add('selected');
        }
    }
});