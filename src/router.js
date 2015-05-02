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

            console.log(window.location);
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