window['require'] = function(path) {
    return window[path];
};

var router      = require("router"),
    view        = require("view"),
    http        = require("http"),
    container   = require("container"),

    app = function() {
        return {
            view: view,
            router: router,
            http: http,
            container: container,
            run: function(window) {
                try {
                    var scope = this;

                    // Register all core services
                    this.container
                        .register('window', function() {return window;}, true)
                        .register('view', function() {return scope.view;}, true)
                        .register('router', function() {return scope.router;}, true)
                        .register('http', function() {return scope.http;}, true)
                    ;


                    // Trigger reclusive app rendering
                    scope.view.render(window.document, container);
                }
                catch (error) {
                    //TODO add custom error handling
                    this.container.get('messages').add('Error Occurred: "' + error.message + '"', 3);
                    console.error('error', error.message, error.stack, error.toString(), this.container.get('messages'));
                }
            }
        }
    };