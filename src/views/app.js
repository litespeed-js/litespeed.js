var view = require('view');

view.add({
    name: 'ls-app',
    selector: 'data-ls-app',
    template: false,
    repeat: true,
    controller: function(element, container) {
        var window  = container.get('window'),
            router  = container.get('router'),
            route   = router.match(window.location.pathname),
            view    = container.get('view'),
            http    = container.get('http'),
            scope = {
                name: 'ls-scope',
                selector: 'data-ls-scope',
                template: false,
                repeat: true,
                controller: function() {}
            },
            init    = function(scope) {
                var route           = router.match(window.location.pathname);
                scope.template      = (undefined !== route.view.template) ? route.view.template : null;
                scope.controller    = (undefined !== route.view.controller) ? route.view.controller : function() {};

                view.render(element, container);
            };

        view.add(scope);

        window.document.addEventListener('click', function(event) {
            if(!event.target.href) {
                return false;
            }

            event.preventDefault();

            console.log('state', window.location, event.target.href);

            if(window.location == event.target.href) {
                return false;
            }

            window.history.pushState({}, 'Unknown', event.target.href);

            init(scope);

            return true;
        });

        window.addEventListener('popstate', function(e) {
            init(scope);
        });

        init(scope);
    }
});