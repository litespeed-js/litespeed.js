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
var environment;
var request = function() {

    var call = function(method, url, headers) {
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
            return call('GET', url, {})
        },
        'post': function(url, headers) {
            return call('POST', url, headers)
        },
        'put': function(url) {
            return call('PUT', url, {})
        },
        'delete': function(url) {
            return call('DELETE', url, {})
        }
    }
}();
/**
 * Created by eldadfux on 4/27/15.
 */

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
         * @param template string
         * @param controller function
         * @returns router
         */
        state: function(path, template, controller) { // TODO add support for different request methods

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
 * Services
 *
 * Uses as container for application services
 */
var services = function() {

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
         * @returns services
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
/**
 * View
 *
 * Manage application scopes and different views
 */
var view = function() {

    var stock = [];

    return {

        /**
         * Comp
         *
         * Adds a new comp definition to application comp stack.
         *
         * @param object
         * @returns view
         */
        comp: function(object) {

            if(typeof object !== 'object') {
                throw new Error('var object must be of type object');
            }

            stock[stock.length++] = object;

            return this;
        },

        /**
         * Render
         *
         * Render all view components in a given scope.
         *
         * @param scope
         * @returns view
         */
        render: function(scope) {

            var view = this;

            stock.forEach(function(value) {
                var elements = scope.querySelectorAll(value.selector);

                for (var i = 0; i < elements.length; i++) {
                    var element = elements[i];

                    if(!value.template) {
                        value.controller(element);
                        continue;
                    }

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