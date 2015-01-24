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
    - data-ls-state
    - data-ls-bind
    - data-ls-bind-reverse
    - data-ls-show
    - data-ls-hide

router

ioc

Flow
---

init
match
render -> load scope comp -> load sub scopes

Example
---
    var example = new App();
    
    example
        .state('/sample-page/index.html', function() {});

 */


(function() {
    "use strict";

    var http = function() {

        var request = function(method, url, headers) {
            return new Promise(
                function(resolve, reject) {

                    var xmlhttp = new XMLHttpRequest();

                    xmlhttp.open(method, url, true);
                    //xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");

                    xmlhttp.onload = function() {
                        if (4 == xmlhttp.readyState && 200 == xmlhttp.status) {
                            resolve(xmlhttp.response);
                        }

                        reject(Error(xmlhttp.statusText));
                    };

                    // Handle network errors
                    xmlhttp.onerror = function() {
                        reject(Error("Network Error"));
                    };

                    xmlhttp.send();
                }
            )
        };

        return {
            get: function(url, success, failure) {
                return request('GET', url, {})
            },
            post: function(url, headers) {
                return request('POST', url, headers)
            }
        }
    }();

    var App = function() {

        this.view = function() {
            var comps = [];

            return {
                comp: function(object) {

                    if(typeof object !== 'object') {
                        throw new Error('var object must be of type object');
                    }

                    comps[comps.length++] = object;

                    return this;
                },

                render: function(scope) {
                    comps.forEach(function(value) {
                        var elements = scope.querySelectorAll(value.selector);

                        for (var i = 0; i < elements.length; i++) {
                            var element = elements[i];

                            element.style.background    = 'red';
                            element.style.opacity       = '.8';

                            http
                                .get(value.template)
                                .then(
                                    function(data){ element.innerHTML = data; },
                                    function(error){ console.error("Failed!", error); }
                                );

                            // load template (HTTP Service)

                            // execute controller (IOC)

                            // re-render

                            // remove selector
                            // element.removeAttribute(value.selector);
                        }
                    });

                    return this;
                }
            }
        }();

        this.router = function() {
            var states = [];

            return {
                state: function(/* string */ path, /* string */ template, /* function */ controller) {

                    /**
                     * Validation
                     */
                    if(typeof path !== 'string') {
                        throw new Error('var path must be of type string');
                    }

                    if(typeof template !== 'string') {
                        throw new Error('var template must be of type string');
                    }

                    if(typeof controller !== 'function') {
                        throw new Error('var controller must be of type function');
                    }

                    states[states.length++] = {/* string */ path: path, /* string */ template: template, /* function */ controller: controller};

                    return this;
                },

                match: function() {
                    return states.forEach(function(value) {

                        //var route = "/users/:uid/pictures/:eldad";
                        var match   = new RegExp(window.location.origin + value.path.replace(/:[^\s/]+/g, '([\\w-]+)'));
                        var url     = window.location.href;

                        console.log(url.match(match));

                        if(url.match(match)) {
                            return value;
                        }

                        return (states.firstChild) ? states.firstChild : null;
                    });
                }
            }

        }();

        return {
            view: this.view,
            router: this.router
        };
    };

    var example = new App();

    example.router
        .state('/litespeed.js/example/index.html', 'templates/article.html', function() {})
        .state('/index.html', 'templates/article.html', function() {})
        .state('/article/:id.html', 'templates/article.html', function() {})
        .state('/category/:id.html', 'templates/article.html', function() {})
        .match()
    ;

    example.view
        .comp({
            name: 'Scope',
            selector: '[data-ls-scope]',
            template: 'templates/default.html',
            controller: function(element) {
                // Some code here
            }
        })
        .render(document)
    ;

}());