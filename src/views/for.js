container.get('view').add({
    selector: 'data-ls-for',
    repeat: true,
    controller: function(element, expression) {
        var value = expression.parse(element.dataset['lsFor']);

        if(value !== element.htmlFor && value !== '') {
            element.htmlFor = value;
        }
    }
});