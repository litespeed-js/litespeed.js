container.get('view').add({
    selector: 'data-ls-eval',
    template: false,
    controller: function(element, expression) {
        var statement = expression.parse(element.dataset['lsEval']);

        eval(statement);
    }
});