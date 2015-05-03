window['require']     = function(path) {
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
            run: function() {
                try{
                    var route = router.match();

                    this.view
                        .comp({
                            name: 'Scope',
                            selector: '[data-ls-scope]',
                            template: route.template,
                            controller: route.controller
                        })
                        .render(document)
                    ;
                }
                catch (error) {
                    console.error(error);
                }
            }
        }
    };