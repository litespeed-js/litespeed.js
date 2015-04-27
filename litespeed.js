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
            'get': function(url) {
                return request('GET', url, {})
            },
            'post': function(url, headers) {
                return request('POST', url, headers)
            },
            'put': function(url) {
                return request('PUT', url, {})
            },
            'delete': function(url) {
                return request('DELETE', url, {})
            }
        }
    }();

    var App = function() {

        /**
         * View
         *
         * Manage application scopes and different views
         */
        this.view = function() {
            var comps = [];

            return {

                /**
                 * Comp
                 *
                 * Adds a new comp definition to application comp stack.
                 *
                 * @param object
                 * @returns this.view
                 */
                comp: function(object) {

                    if(typeof object !== 'object') {
                        throw new Error('var object must be of type object');
                    }

                    comps[comps.length++] = object;

                    return this;
                },

                /**
                 * Render
                 *
                 * Render all view components in a given scope.
                 *
                 * @param scope
                 * @returns this.view
                 */
                render: function(scope) {

                    var view = this;

                    console.log(scope);
                    comps.forEach(function(value) {
                        var elements = scope.querySelectorAll(value.selector);

                        for (var i = 0; i < elements.length; i++) {
                            var element = elements[i];

                            element.style.background    = '#'+Math.floor(Math.random()*16777215).toString(16);
                            element.style.opacity       = '.8';

                            http
                                .get(value.template)
                                .then(
                                    function(data){
                                        element.innerHTML = data;

                                        // execute controller (IOC) TODO: use IOC instead of direct execution
                                        value.controller(element);

                                        // re-render specific scope
                                        view.render(element);
                                    },

                                    function(error){ console.error("Failed!", error); }
                                );
                        }
                    });

                    return this;
                }
            }
        }();

        /**
         * Router
         *
         * Holds application states and match logic
         */
        this.router = function() {
            var states = [];

            return {

                /**
                 * State
                 *
                 * Adds a new application state.
                 *
                 * @param path string
                 * @param template string
                 * @param controller function
                 * @returns this.router
                 */
                state: function(path, template, controller) {

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

                /**
                 * Match
                 *
                 * Compare current location and application states to find a match.
                 */
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