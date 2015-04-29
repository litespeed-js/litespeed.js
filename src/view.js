/**
 * View
 *
 * Manage application scopes and different views
 */
var view = function() {
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