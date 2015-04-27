/*jslint browser: true*/

/*

API
---

controller (action)

models

services
    - HTTP *
    - 

components
    - data-ls-bind
    - data-ls-bind-reverse
    - data-ls-show
    - data-ls-hide
    - data-ls-scope *
    - data-ls-loop

router

ioc

Flow
---

init
match
render -> load scope comp -> load sub scopes


Concepts to think about
---

SimplicityX100
Templates Engine (Based on HTML only?)
Relay on native API as much as possible
Works on both back and front?

Features to modules:

 * MVC - app.js + request.js + response.js
 * Binding - view.js + native observer
 * States - router.js
 * Services - service.js
 * Components - view.js

Modules:

app.js
request.js
response.js
router.js
service.js
view.js

 */

(function() {
    "use strict";

    var example = new App();

    example.router
        .state('/litespeed.js/example/index.html', 'templates/article.html', function() {})
        .state('/index.html', 'templates/article.html', function() {})
        .state('/article/:id.html', 'templates/article.html', function() {})
        .state('/category/:id.html', 'templates/article.html', function() {})
        .match()
    ;

    /*

    example.service
        .register(name, singelton)
        .get(name, singelton)
    ;

    */

    example.view
        .comp({
            name: 'Scope',
            selector: '[data-ls-scope]',
            template: 'templates/default.html',
            controller: function(element) {
                // Some code here
            }
        })
        .comp({
            name: 'Demo Comp',
            selector: '[data-ls-comp]',
            template: 'templates/comp.html',
            controller: function(element) {
                // Some code here
            }
        })
        .render(document)
    ;

    document.addEventListener('click', function(event) {

        if(event.target.href ) {
            console.log(event.target.href);
            window.history.pushState({}, 'Unknown', event.target.href);
            event.preventDefault();
        }

    });

}());