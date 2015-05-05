window['require'] = function(path) {
    return path;
};

var request     = require("request"),
    response    = require("response"),
    router      = require("router"),
    view        = require("view"),
    services    = require("services"),

    app = function() {

        view.comp({
            name: 'ls-bind',
            selector: '[data-ls-bind]',
            template: false,
            controller: function(element, services) {
                // TODO make sure used only on input elements or span for regular text

                var reference   = element.dataset['lsBind'],
                    array       = reference.split('.'),
                    last        = array.pop(),
                    first       = array.shift(),
                    object      = example.services.get(first)
                    ;

                element.addEventListener('input', function(){
                    if(array.length) {
                        Object.byString(object, array.join('.'))[last] = element.value;
                    }
                    else {
                        object[last] = element.value;
                    }
                    console.log(object);
                });
            }
        });

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
                    console.error(error.message, error.stack, error.toString());
                }
            }
        }
    };