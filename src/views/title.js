container.get('view').add({
    selector: 'data-ls-title',
    template: false,
    repeat: true,
    controller: function(element, expression) {
        element.title = expression.parse(element.dataset['lsTitle']);
    }
});