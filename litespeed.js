/*jslint browser: true*/

/*

controller (action)
    - init
    - shutdown

models
    - HTTP
    -

components
    - data-binding (using component?)
    
router

ioc

 */


(function(window) {
    "use strict";


    var App = window.App = window.App || {}, init, shutdown, example = new App();

    example
        .state('/sample-page/index.html', function() {});

    App.router = function() {

        var routes = {};

        return {
            init: init,
            shutdown: shutdown,
            addRoute: function(path, action) {
                routes[path] = action;

                return this;
            }
        };
    };

    return {
        init: init,
        shutdown: shutdown,
    };


}(window));


var routes = {};
// The route registering function:
function route (path, templateId, controller) {
    // Allow route(path, controller) for template less routes:
    if (typeof templateId === 'function') {
        controller = templateId;
        templateId = null;
    }
    routes[path] = {templateId: templateId, controller: controller};
}
var el = null, current = null;
function router () {
    // Current route url (getting rid of '#' in hash as well):
    var url = location.hash.slice(1) || '/';
    // Get route by url:
    var route = routes[url];
    // Is it a route without template?
    if (route && !route.templateId) {
        // Just initiate controller:
        return route.controller ? new route.controller : null;
    }
    // Lazy load view element:
    el = el || document.getElementById('view');
    // Clear existing observer:
    if (current) {
        Object.unobserve(current.controller, current.render);
        current = null;
    }
    // Do we have both a view and a route?
    if (el && route && route.controller) {
        // Set current route information:
        current = {
            controller: new route.controller,
            template: tmpl(route.templateId),
            render: function () {
                // Render route template with John Resig's template engine:
                el.innerHTML = this.template(this.controller);
            }
        };
        // Render directly:
        current.render();
        // And observe for changes:
        Object.observe(current.controller, current.render.bind(current));
    }
}
// Listen on hash change:
this.addEventListener('hashchange', router);
// Listen on page load:
this.addEventListener('load', router);
// Expose the route register function:
this.route = route;
