container.get('view').add({
    selector: 'data-ls-trigger',
    repeat: true,
    controller: function(element, expression) {
        let trigger = expression.parse(element.dataset['lsTrigger']);

        trigger = trigger.split(',');

        element.addEventListener('click', function () {
            for (let i = 0; i < trigger.length; i++) {
                let event = trigger[i].trim();

                if ('' === event) {
                    continue;
                }

                console.log(event);

                window.document.dispatchEvent(new CustomEvent(event, {
                    bubbles: false, cancelable: true
                }));
            }
        });
    }
});