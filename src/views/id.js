container.get('view').add({
    selector: 'data-ls-id',
    repeat: true,
    controller: function(element, expression) {
        var id = expression.parse(element.dataset['lsId']);

        if(id !== element.id && id !== '') {
            element.id = id;
        }
    }
});