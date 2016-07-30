/**
 * Container
 *
 * Uses as container for application services
 */
var container = function() {

    // FIXME add support for singelton

    var stock = [];

    return {

        /**
         * Register
         *
         * Adds a new service definition to application services stack.
         *
         * @param name string
         * @param object callback|object
         * @param singelton bool
         * @returns container
         */
        register: function(name, object, singelton) {
            if(typeof name !== 'string') {
                throw new Error('var name must be of type string');
            }

            if(typeof object !== 'function' && (typeof object !== 'object')) {
                throw new Error('var object "' + name + '" must be of type function or object');
            }

            if(typeof singelton !== 'boolean') {
                throw new Error('var singelton "' + name + '" must be of type boolean');
            }

            stock[name] = {
                name: name,
                object: object,
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
                var instance  = (typeof service.object == 'function') ? service.object() : service.object;

                if(service.singleton) {
                    service.instance = instance;
                }

                return instance;
            }

            return service.instance;
        }
    }
}();