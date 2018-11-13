container.get('view').add({
    selector: 'data-ls-rerender',
    template: false,
    repeat: true,
    controller: function(element, view, http, expression, document, container) {
        var events  = element.dataset['lsRerender'] || '';
        var scope   = element.dataset['scope'] || '';

        scope = (scope) ? container.get(scope) : document;

        events = events.trim().split(',');

        for (var i = 0; i < events.length; i++) {
            if('' === events[i]) {
                continue;
            }

            scope.addEventListener(events[i], function () {
                view.render(element);
            })
        }
    }
});