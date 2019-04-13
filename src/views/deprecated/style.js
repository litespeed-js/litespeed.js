container.get('view').add({
    selector: 'data-ls-style',
    template: false,
    repeat: true,
    controller: function(element, expression) {
        element.style.cssText = expression.parse(element.dataset['lsStyle']);
    }
});