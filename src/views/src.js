container.get('view').add({
    selector: 'data-ls-src',
    template: false,
    repeat: true,
    controller: function(element, expression) {
        element.addEventListener('error', function() {
            element.style.opacity = '0';
        });

        element.addEventListener('load', function() {
            element.style.opacity = '1';
        });

        let src = expression.parse(element.dataset['lsSrc']);

        if(src !== element.src && src !== '') {
            element.src = src;
        }
    }
});