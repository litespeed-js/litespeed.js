container.get('view').add({
    selector: 'data-ls-init',
    controller: function(element, window, document, view, state) {
        let firstFromServer = (element.getAttribute('data-first-from-server') === 'true');
        let scope   = {
                selector: 'data-ls-scope',
                template: false,
                repeat: true,
                controller: function() {},
                state: true
            },
            init    = function(route) {
                window.scrollTo(0, 0);

                if(window.document.body.scrollTo) {
                    window.document.body.scrollTo(0, 0);
                }

                state.reset();

                if(null === route) {
                    return; // no view found
                }

                // Merge
                scope.protected     = (undefined !== route.view.protected) ? route.view.protected : false;

                if(scope.protected && (null === state.getPrevious())) { // Avoid protected link to be used for CSRF attacks
                    throw new Error('CSRF protection');
                }

                scope.template      = (undefined !== route.view.template) ? route.view.template : null;
                scope.controller    = (undefined !== route.view.controller) ? route.view.controller : function() {};
                scope.state         = (undefined !== route.view.state) ? route.view.state : true;

                document.dispatchEvent(new CustomEvent('state-change'));

                if(firstFromServer && null === state.getPrevious()) { // Disable first view, so server could render it faster
                    scope.template  = '';
                }
                else if(null !== state.getPrevious()) {
                    scope.nested = false; // Fix problem when re rendering previous page inline template before remote template loaded
                    view.render(element);
                }

                document.dispatchEvent(new CustomEvent('state-changed'));
            },
            findParent = function(tagName, el) {
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

            let route = state.match(target);

            if(null === route) { // No match. this link is not related to our app
                return false;
            }

            event.preventDefault(); // Stop normal browser behavior. Start to act as single page

            if(window.location === target.href) { // Same link. Don't re-execute a thing
                return false;
            }

            route.view.state = (undefined === route.view.state) ? true : route.view.state;

            if(true === route.view.state) { // Refresh all window on scope change
                if(state.getPrevious() && state.getPrevious().view && (state.getPrevious().view.scope !== route.view.scope)) {
                    window.location.href = target.href;
                    return false;
                }

                window.history.pushState({}, 'Unknown', target.href);
            }

            init(route);

            return true;
        });

        window.addEventListener('popstate', function() { // Handle back button behavior
            let route = state.match(window.location);

            if(state.getPrevious() && state.getPrevious().view && (state.getPrevious().view.scope !== route.view.scope)) {
                window.location.reload();
                return false;
            }

            init(route);
        });

        init(state.match(window.location)); // Handle first start
    }
});