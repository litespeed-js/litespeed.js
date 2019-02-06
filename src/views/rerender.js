container.get('view').add({
    selector: 'data-ls-rerender',
    template: false,
    repeat: true,
    controller: function(element, view, http, expression, document, container) {
        let events  = element.dataset['lsRerender'] || '';
        let scope   = element.dataset['scope'] || '';

        scope = (scope) ? container.get(scope) : document;

        events = events.split(',');

        for (let i = 0; i < events.length; i++) {
            let event = events[i].trim();

            if('' === event) {
                continue;
            }

            scope.addEventListener(event, function () {
                view.render(element);
            })
        }
    }
});