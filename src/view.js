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