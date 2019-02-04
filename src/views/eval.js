container.get('view').add({
    selector: 'data-ls-eval',
    template: false,
    controller: function(element, expression) {
        let statement = expression.parse(element.dataset['lsEval']);

        eval(statement);
    }
});