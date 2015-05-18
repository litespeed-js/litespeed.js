window['require'] = function(path) {
    return window[path];
};

var request     = require("request"),
    response    = require("response"),
    router      = require("router"),
    view        = require("view"),
    container   = require("container"),

    app = function() {
        return {
            view: view,
            router: router,
            container: container,
            run: function(window) {
                var scope = this;
                try {
                    this.container
                        .register('window', function() {return window;}, true)
                        .register('router', function() {return this.router;}, true)
                    ;
                }
                catch (error) {
                    console.error('error', error.message, error.stack, error.toString());
                }
            }
        }
    };
/**
 * Container
 *
 * Uses as container for application services
 */
var container = function() {

    var stock = [];

    return {

        /**
         * Register
         *
         * Adds a new service definition to application services stack.
         *
         * @param name string
         * @param callback function
         * @param singelton bool
         * @returns container
         */
        register: function(name, callback, singelton) {

            if(typeof name !== 'string') {
                throw new Error('var name must be of type string');
            }

            if(typeof callback !== 'function') {
                throw new Error('var callback must be of type function');
            }

            if(typeof singelton !== 'boolean') {
                throw new Error('var callback must be of type boolean');
            }

            stock[name] = {
                name: name,
                callback: callback,
                singleton: singelton,
                instance: null
            };

            return this;
        },

        /**
         * Get Service
         *
         * Return service instance
         *
         * @param name
         * @returns {*}
         */
        get: function(name) {
            var service = (undefined !== stock[name]) ? stock[name] : null;

            if(null === service) {
                throw new Error('service \'' + name + '\' is not registered');
            }

            if(service.instance === null) {
                var instance  = service.callback();

                if(service.singleton) {
                    service.instance = instance;
                }

                return instance;
            }

            return service.instance;
        }
    }
}();
Object.path = function(object, string, value, returnParent) {
    string = string.split('.');

    while (string.length > 1)
        object = object[string.shift()];

    if(undefined !== value) {
        return object[string.shift()] = value;
    }

    if(returnParent) {
        return object;
    }

    return object[string.shift()];
};
/**
 * Router
 *
 * Holds application states and match logic
 */
var router = function() {

    var states  = [],
        before  = function() {},
        after   = function() {}
    ;

    return {

        /**
         * State
         *
         * Adds a new application state.
         *
         * @param path string
         * @param view object
         * @returns router
         */
        state: function(path, view) { // TODO add support for different request methods

            /**
             * Validation
             */
            if(typeof path !== 'string') {
                throw new Error('var path must be of type string');
            }

            if(typeof view !== 'object') {
                throw new Error('var view must be of type object');
            }

            states[states.length++] = {/* string */ path: path, /* object */ view: view};

            return this;
        },

        /**
         * Match
         *
         * Compare current location and application states to find a match.
         */
        match: function() {
            for (var i = 0; i < states.length; i++) {
                var value   = states[i],
                    match   = new RegExp(window.location.origin + value.path.replace(/:[^\s/]+/g, '([\\w-]+)')),  //FIXME get this from response, relative to relevant environment
                    url     = window.location.href; //FIXME get this from request, relative to relevant environment

                if(url.match(match)) {
                    return value;
                }
            }

            return null
        }
    }

}();
/**
 * View
 *
 * Manage application scopes and different views
 */
var view = function() {

    var stock = {},
        i = 0;

    return {

        /**
         * Add View
         *
         * Adds a new comp definition to application comp stack.
         *
         * @param object
         * @returns view
         */
        add: function(object) {

            if(typeof object !== 'object') {
                throw new Error('var object must be of type object');
            }

            var key = (object.singelton) ? object.name : object.name + '-' + i++;

            stock[key] = object;

            return this;
        },

        /**
         * Render
         *
         * Render all view components in a given scope.
         *
         * @param scope
         * @param services
         * @returns view
         */
        render: function(scope, services) {
            var view = this;

            for (var key in stock) {
                if (stock.hasOwnProperty(key)) {
                    var value       = stock[key],
                        elements    = scope.querySelectorAll('[' + value.selector + ']');

                    for (var i = 0; i < elements.length; i++) {
                        var element = elements[i];

                        if(!value.template) {
                            value.controller(element, services);
                            continue;
                        }

                        http
                            .get(value.template)
                            .then(function(element, value) {
                                return function(data){
                                    element.innerHTML = data;

                                    // execute controller (IOC) TODO: use IOC instead of direct execution
                                    value.controller(element, services);

                                    // re-render specific scope
                                    view.render(element, services);

                                    element.removeAttribute(value.selector);
                                    console.log('removed-view', element);
                                }
                            }(element, value),
                            function(error) {
                                console.error("Failed!", error);
                            }
                        );
                    }
                }
            }

            return this;
        }
    }
}();
/**
 * Created by eldadfux on 5/9/15.
 */

var http = function() {

    /**
     *
     * @param method string
     * @param url string
     * @param headers string
     * @param body string
     * @returns Promise
     */
    var request = function(method, url, headers, body) {

        var host    = '';

        if(-1 == ['GET', 'POST', 'PUT', 'DELETE', 'TRACE', 'HEAD', 'OPTIONS', 'CONNECT', 'PATCH'].indexOf(method)) {
            throw new Error('var method must contain a valid HTTP method name');
        }

        if(typeof url !== 'string') {
            throw new Error('var url must be of type string');
        }

        if(typeof headers !== 'object') {
            throw new Error('var headers must be of type object');
        }

        if(typeof url !== 'string') {
            throw new Error('var url must be of type string');
        }

        return new Promise(
            function(resolve, reject) {

                var xmlhttp = new XMLHttpRequest();

                xmlhttp.open(method, url, true);

                for (var key in headers) {
                    if (headers.hasOwnProperty(key)) {
                        xmlhttp.setRequestHeader(key, headers[key]);
                    }
                }

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

                xmlhttp.send(body);
            }
        )
    };

    return {
        'get': function(url) {
            return request('GET', url, {}, '')
        },
        'post': function(url, headers, params) {
            return request('POST', url, {'Content-type': 'application/x-www-form-urlencoded'}, '')
        },
        'put': function(url) {
            return request('PUT', url, {}, '')
        },
        'delete': function(url) {
            return request('DELETE', url, {}, '')
        }
    }
}();

var view = require('view');

view.add({
    name: 'ls-bind',
    selector: 'data-ls-bind',
    template: false,
    controller: function(element, container) {
        var reference   = element.dataset['lsBind']
                .replace('[\'', '.')
                .replace('\']', '')
                .split('.'), // Make syntax consistent using only dot nesting
            service     = container.get(reference.shift()),
            path        = reference.join('.'),
            watch       = Object.path(service, path, undefined, true)
            ;

        Object.observe(watch, function(changes) {
            changes.forEach(function(change) {
                var value = Object.path(service, path);

                if(value != element.value) {
                    element.value = value;
                    console.log('updated', service);
                    console.log('changes', changes);
                }
            });
        });

        element.addEventListener('input', function() {
            Object.path(service, path, element.value);
            console.log('input', service);
        });

        element.value = Object.path(service, path);
    }
});

var view = require('view');

view.add({
    name: 'ls-eval',
    selector: 'data-ls-eval',
    template: false,
    controller: function(element, container) {
        var statement   = element.dataset['lsEval'];
alert(2);
        eval(statement);
    }
});

var view = require('view');

view.add({
    name: 'ls-loop',
    selector: 'data-ls-loop',
    template: false,
    controller: function(element) {

        var reference   = element.dataset['lsLoop'].replace('[\'', '.').replace('\']', '').split('.'), // Make syntax consistent using only dot nesting
            template    = element.innerHTML,
            service     = container.get(reference.shift()),
            path        = reference.join('.'),
            array       = Object.path(service, path),
            watch       = Object.path(service, path, undefined, true),
            render      = function(element, array) {
                var output = '';

                for (var i = 0; i < array.length; i++) {
                    //console.log(template);
                    output += template
                        .replace(/{{ /g, '{{')
                        .replace(/ }}/g, '}}')
                        .replace(/{{value}}/g, array[i])
                        .replace(/{{key}}/g, i)
                    ;
                }

                element.innerHTML = output;
            }
            ;

        if(typeof array !== 'array' && typeof array !== 'object') {
            throw new Error('Reference \'' + path + '\' value must be array or object. ' + (typeof array) + ' given');
        }

        render(element, array);

        Object.observe(watch, function(changes) {
            render(element, array);
        });
    }
});

var view = require('view');

view.add({
    name: 'ls-placeholder',
    selector: 'data-ls-placeholder',
    template: false,
    controller: function(element, container) {
        var reference   = element.dataset['lsPlaceholder']
                .replace('[\'', '.')
                .replace('\']', '')
                .split('.'), // Make syntax consistent using only dot nesting
            service     = container.get(reference.shift()),
            path        = reference.join('.'),
            watch       = Object.path(service, path, undefined, true)
            ;

        Object.observe(watch, function(changes) {
            changes.forEach(function(change) {
                var value = Object.path(service, path);

                if(value != element.innerHTML) {
                    element.innerHTML = value;
                    console.log('updated', service);
                    console.log('changes', changes);
                }
            });
        });

        element.innerHTML = Object.path(service, path);
    }
});
var view = require('view');

view.add({
    name: 'ls-scope',
    selector: 'data-ls-submit',
    template: false,
    controller: function(element, container) {
        var window = container.get('window'),
            router = container.get('router'),
            route = router.match()
            ;

        window.document.addEventListener('click', function(event) {
            if(event.target.href) {
                event.preventDefault();

                console.log('state', window.location, event.target.href);

                if(window.location == event.target.href) {
                    return false;
                }

                window.history.pushState({}, 'Unknown', event.target.href);

                scope.run(window);
            }

            return true;
        });

        window.addEventListener('popstate', function(e) {
            scope.run(window);
        });

        this.render(window.document, this.container);
    }
});

var view = require('view');

view.add({
    name: 'ls-submit',
    selector: 'data-ls-submit',
    template: false,
    controller: function(element) {
        console.log('submit', element);
        element.addEventListener('submit', function(event) {
            event.preventDefault();

            //alert('submit');

            /**
             * 1. Get list of parameters
             * 2. Sort parameters by function signature
             * 3. Apply parameters to function and execute it
             */

            var x = [ 'p0', 'p1', 'p2' ];
            call_me.apply(this, x);
        });

        //element.nodeName
    }
});