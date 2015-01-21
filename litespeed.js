/*jslint browser: true*/

/*

API
---

controller (action)
    - init
    - shutdown

models

services
    - HTTP
    - 

components
    - data-ls-bind
    - data-ls-bind-reverse
    - data-ls-show
    - data-ls-hide
    - data-ls-scope
    - data-ls-loop

router

ioc

Example
---
    var example = new App();
    
    example
        .state('/sample-page/index.html', function() {});

 */


(function(window) {
    "use strict";


    var App = window.App = window.App || {}, init, shutdown;

    App.router = function() {

        var routes = {};

        return {
            init: init,
            shutdown: shutdown,
            addRoute: function(path, action) {
                routes[path] = action;

                return this;
            }
        };
    };

    return {
        init: init,
        shutdown: shutdown,
    };

}(window));
