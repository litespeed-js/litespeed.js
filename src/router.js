/**
 * Module dependencies.
 */
var dep1 = require('accepts');

/**
 * Request prototype.
 */
var example = exports = module.exports = {
    __proto__: http.IncomingMessage.prototype
};

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