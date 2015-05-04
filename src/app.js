window['require'] = function(path) {
    return path;
};

var request     = require("request"),
    response    = require("response"),
    router      = require("router"),
    view        = require("view"),
    services    = require("services"),

    app = function() {

        return {
            view: view,
            router: router,
            services: services,
            run: function(window) { // window or alternative scope (index.html)
                try {

                    //this.services.register('window', function(window) {
                    //    return window // FIXME pass object not callback
                    //}(window), true);

                    var route = this.router.match();

                    this.view
                        .comp({
                            name: 'ls-scope',
                            singelton: true,
                            selector: '[data-ls-scope]',
                            template: route.template,
                            controller: route.controller
                        })
                        .render(window.document);
                }
                catch (error) {
                    console.error(error);
                }
            }
        }
    };