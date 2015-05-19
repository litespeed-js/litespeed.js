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

                    this.container
                        .register('window', function() {return window;}, true)
                        .register('view', function() {return scope.view;}, true)
                        .register('router', function() {return scope.router;}, true)
                        .register('http', function() {return scope.http;}, true)
                    ;

                    scope.view.render(window.document, container);
                }
                catch (error) {
                    console.error('error', error.message, error.stack, error.toString());
                }
            }
        }
    };