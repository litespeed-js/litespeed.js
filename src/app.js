window['require'] = function(path) {
    return path;
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

                    this.container.register('window', function() {return window;}, true);

                    var route = this.router.match();

                    this.view
                        .add({
                            name: 'ls-scope',
                            singelton: true,
                            selector: '[data-ls-scope]',
                            template: route.template,
                            controller: route.controller
                        })
                        .render(window.document, this.container);
                }
                catch (error) {
                    console.error('error', error.message, error.stack, error.toString());
                }
            }
        }
    };