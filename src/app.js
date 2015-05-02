var //request     = env.require("request"),
    //response    = env.require("response"),
    //router      = env.require("router"),
    //view        = env.require("view"),
    App = function() {
        return {
            view:view,
            router:router,
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
                    console.log(error);
                }
            }
        }
    };