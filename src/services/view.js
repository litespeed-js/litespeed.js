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
         * @param container
         * @returns view
         */
        render: function(scope, container) {
            var view = this;

            for (var key in stock) { // Iterate all registered views
                if (stock.hasOwnProperty(key)) {
                    var value       = stock[key],
                        elements    = scope.querySelectorAll('[' + value.selector + ']'),
                        postRender  = function(view, element, container) {
                            view.controller(element, container); // Execute controller

                            if(true !== value.repeat) { // Remove view that should not repeat itself
                                element.removeAttribute(view.selector);
                            }
                        };

                    for (var i = 0; i < elements.length; i++) {
                        var element = elements[i];

                        if(!value.template) {
                            postRender(value, element, container);
                            continue;
                        }

                        // Load new view template
                        var result = http
                            .get(value.template)
                            .then(function(element, value) {
                                return function(data){
                                    element.innerHTML = data;

                                    postRender(value, element, container);

                                    // re-render specific scope
                                    view.render(element, container);
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