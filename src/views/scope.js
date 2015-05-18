var view = require('view');

view.add({
    name: 'ls-scope',
    selector: 'data-ls-submit',
    template: false,
    controller: function(element, container) {
        var window = container.get('window'),
            router = container.get('router'),
            route = router.match()
            ;

        window.document.addEventListener('click', function(event) {
            if(event.target.href) {
                event.preventDefault();

                console.log('state', window.location, event.target.href);

                if(window.location == event.target.href) {
                    return false;
                }

                window.history.pushState({}, 'Unknown', event.target.href);

                scope.run(window);
            }

            return true;
        });

        window.addEventListener('popstate', function(e) {
            scope.run(window);
        });

        this.render(window.document, this.container);
    }
});