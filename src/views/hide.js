container.get('view').add({
    selector: 'data-ls-hide',
    template: false,
    repeat: true,
    controller: function(element, expression) {
        if((eval(expression.parse(element.dataset['lsHide'])))) {
            element.style.display = 'inherit';
        }
        else {
            element.style.display = 'none';
        }
    }
});