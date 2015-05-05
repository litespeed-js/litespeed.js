(function() {
    "use strict";

    var example = app();

    example.router
        .state('/index.html', '/pages/home.html', function() {})
        .state('/pages/about.html', '/pages/about.html', function() {})
        .state('/pages/article.html', '/pages/article.html', function() {})
        .state('/pages/example.html', '/pages/example.html', function() {})
    ;

    example.view
        .comp({
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
        })
        .comp({
            name: 'ls-loop',
            selector: '[data-ls-loop]',
            isomorphic: true,
            template: false,
            controller: function(element) {}
        })
    ;

     example.services
        .register('tasks', function() {
             return {
                 title: 'Task Title',
                 test: {
                     new: 'title',
                     nested: {
                         value: 'empty'
                     }
                 },
                 list: [
                    'Task #1',
                    'Task #2',
                    'Task #3'
                 ]
             }
         }, true)
     ;

    example.run(window);

















    if ( typeof module !== "undefined" && module.exports ) {
        module.exports = example;
    } else {
        window.example = example;
    }

    window.document.addEventListener('click', function(event) {
        if(event.target.href) {
            event.preventDefault();

            if(window.location == event.target.href) {
                return false;
            }

            window.history.pushState({}, 'Unknown', event.target.href);

            example.run(window);

            return true;
        }
    });

    window.addEventListener('popstate', function(e) {
        example.run(window);
    });

}());