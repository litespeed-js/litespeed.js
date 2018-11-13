container.get('view').add({
    selector: 'data-ls-alt',
    template: false,
    repeat: true,
    controller: function(element, expression) {
        element.alt = expression.parse(element.dataset['lsAlt']);
    }
});