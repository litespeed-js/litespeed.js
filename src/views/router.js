window.ls.container.get('view').add({
    selector: 'data-ls-router',
    repeat: false,
    controller: function(element, window, document, view, router) {
        let firstFromServer = (element.getAttribute('data-first-from-server') === 'true');
        let scope = {
                selector: 'data-ls-scope',
                template: false,
                repeat: true,
                controller: function() {},
            };
        let init = function(route) {
            let count = parseInt(element.getAttribute('data-ls-scope-count') || 0);

            element.setAttribute('data-ls-scope-count', count + 1);

            window.scrollTo(0, 0);

            if(window.document.body.scrollTo) {
                window.document.body.scrollTo(0, 0);
            }

            router.reset();

            if(null === route) {
                return; // no view found
            }

            scope.template      = (undefined !== route.view.template) ? route.view.template : null;
            scope.controller    = (undefined !== route.view.controller) ? route.view.controller : function() {};

            document.dispatchEvent(new CustomEvent('state-change'));

            if(firstFromServer && null === router.getPrevious()) { // Disable first view, so server could render it faster
                scope.template  = '';
            }
            else if(count === 1) {
                view.render(element);
            }
            else if(null !== router.getPrevious()) {
                view.render(element);
            }

            document.dispatchEvent(new CustomEvent('state-changed'));
        };
        let findParent = function(tagName, el) {
            if ((el.nodeName || el.tagName).toLowerCase() === tagName.toLowerCase()){
                return el;
            }
            while (el = el.parentNode){
                if ((el.nodeName || el.tagName).toLowerCase() === tagName.toLowerCase()){
                    return el;
                }
            }
            return null;
        };

        element.removeAttribute('data-ls-router'); // Avoid re-rendering loop

        // Count number of scopes changed to adjust routing logic
        element.setAttribute('data-ls-scope', '');
        element.setAttribute('data-ls-scope-count', 1);

        view.add(scope);

        document.addEventListener('click', function(event) { // Handle user navigation
            let target = findParent('a', event.target);

            if(!target) {
                return false; // no a target
            }

            if(!target.href) { // Just a normal click not an href
                return false;
            }

            if((event.metaKey)) { // CTRL / CMD key is pressed in order to open link in a new tab
                return false;
            }

            if ((target.hasAttribute('target')) && ('_blank' === target.getAttribute('target'))) { // Link should open in a new tab
                return false;
            }

            if(target.hostname !== window.location.hostname) { // Different hostname. Can't do single page magic
                return false;
            }

            let route = router.match(target);

            if(null === route) { // No match. this link is not related to our app
                return false;
            }

            event.preventDefault(); // Stop normal browser behavior. Start to act as single page

            if(window.location === target.href) { // Same link. Don't re-execute a thing
                return false;
            }

            route.view.state = (undefined === route.view.state) ? true : route.view.state;

            if(true === route.view.state) { // Refresh all window on scope change
                if(router.getPrevious() && router.getPrevious().view && (router.getPrevious().view.scope !== route.view.scope)) {
                    window.location.href = target.href;
                    return false;
                }

                window.history.pushState({}, 'Unknown', target.href);
            }

            init(route);

            return true;
        });

        window.addEventListener('popstate', function() { // Handle back button behavior
            init(router.match(window.location));
        });

        window.addEventListener('hashchange', function() { // Handle hash behavior
            init(router.match(window.location));
        });

        init(router.match(window.location)); // Handle first start
    }
});