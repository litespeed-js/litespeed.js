window['require'] = function(path) {
    return window[path];
};

var request     = require("request"),
    response    = require("response"),
    router      = require("router"),
    view        = require("view"),
    container   = require("container"),

    app = function() {
        return {
            view: view,
            router: router,
            container: container,
            run: function(window) {
                var scope = this;
                try {
                    this.container
                        .register('window', function() {return window;}, true)
                        .register('router', function() {return this.router;}, true)
                    ;
                }
                catch (error) {
                    console.error('error', error.message, error.stack, error.toString());
                }
            }
        }
    };