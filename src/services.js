/**
 * View
 *
 * Manage application scopes and different views
 */
var services = function() {

    var stock = [];

    return {

        /**
         * Register
         *
         * Adds a new service definition to application services stack.
         *
         * @param object
         * @returns services
         */
        register: function(object) {

            if(typeof object !== 'object') {
                throw new Error('var object must be of type object');
            }

            stock[stock.length++] = object;

            return this;
        }
    }
}();