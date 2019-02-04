container.get('view').add({
    selector: 'data-ls-trigger',
    repeat: true,
    controller: function(element, expression) {
        let trigger = expression.parse(element.dataset['lsTrigger']);

        element.addEventListener('click', function () {
            window.document.dispatchEvent(new CustomEvent(trigger, {
                bubbles: false,
                cancelable: true
            }));
        });
    }
});