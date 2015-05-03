(function() {
    "use strict";

    var example = app();

    example.router
        .state('/index.html', '/pages/home.html', function() {})
        .state('/pages/about.html', '/pages/about.html', function() {})
        .state('/pages/article.html', '/pages/article.html', function() {})
    ;

    example.view
        .comp({
            name: 'Bind',
            selector: '[data-ls-bind]',
            isomorphic: false,
            template: false,
            controller: function(element) {
                // TODO make sure used only on input elements or span for regular text
                var reference = element.dataset['lsBind'];

                var tasks = {
                    title: 'default title',
                    list: []
                };

                element.addEventListener('input', function(){
                    console.log(element.value, reference, tasks);

                    tasks.title = element.value;
                });
            }
        })
        .comp({
            name: 'Loop',
            selector: '[data-ls-loop]',
            isomorphic: true,
            template: false,
            controller: function(element) {}
        })
    ;

    /*

     example.service
        .register(name, callback, singelton)
        .get(name)
     ;

     */

    example.view.comp({
        name: 'Demo Comp',
        selector: '[data-ls-comp]',
        isomorphic: false,
        template: 'templates/comp.html',
        controller: function(element) {}
    });

    example.run();

















    if ( typeof module !== "undefined" && module.exports ) {
        module.exports = example;
    } else {
        window.example = example;
    }

    window.document.addEventListener('click', function(event) {
        if(event.target.href) {
            window.history.pushState({}, 'Unknown', event.target.href);
            event.preventDefault();

            example.run();
        }
    });

    window.addEventListener('popstate', function(e) {
        example.run();
    });

}());