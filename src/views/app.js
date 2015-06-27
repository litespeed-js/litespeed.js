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
            scope   = {
                name: 'ls-scope',
                selector: 'data-ls-scope',
                template: false,
                repeat: true,
                controller: function() {},
                state: true
            },
            init    = function(route) {
                // Merge
                scope.template      = (undefined !== route.view.template) ? route.view.template : null;
                scope.controller    = (undefined !== route.view.controller) ? route.view.controller : function() {};
                scope.state         = (undefined !== route.view.state) ? route.view.state : true;

                view.render(element, container);
            };

        view.add(scope);

        window.document.addEventListener('click', function(event) { // Handle user navigation

            if(!event.target.href) { // Just a normal click not an href
                return false;
            }

            var route = router.match(event.target.href);

            if(null === route) { // No match. this link is not related to our app
                return false;
            }

            event.preventDefault(); // Stop normal browser behavior. Start to act as single page

            if(window.location == event.target.href) { // Same link. Don't re-execute a thing
                return false;
            }

            route.view.state = (undefined === route.view.state) ? true : route.view.state;

            if(true === route.view.state) {
                window.history.pushState({}, 'Unknown', event.target.href);
            }

            init(route);

            return true;
        });

        window.addEventListener('popstate', function(e) { // Handle back button behavior
            init(router.match(window.location.pathname));
        });

        init(router.match(window.location.pathname)); // Handle first start
    }
});