container.get('view').add({
    selector: 'data-ls-class',
    template: false,
    repeat: true,
    controller: function(element, expression) {
        element.className = expression.parse(element.dataset['lsClass']);
    }
});