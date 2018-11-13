container.get('view').add({
    selector: 'data-ls-href',
    template: false,
    repeat: true,
    controller: function(element, expression) {
        element.href = expression.parse(element.dataset['lsHref']);
    }
});