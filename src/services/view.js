/**
 * View
 *
 * Manage application scopes and different views
 */
container.set('view', function(http, container) {
    var stock = {};

    var execute = function(view, node, container) {
        container.set('element', node, true);

        container.resolve(view.controller);

        if(true !== view.repeat) { // Remove view that should not repeat itself
            node.removeAttribute(view.selector);
        }
    };

    return {

        stock: stock,

        /**
         * Add View
         *
         * Adds a new comp definition to application comp stack.
         *
         * @param object
         * @returns {add}
         */
        add: function(object) {

            if(typeof object !== 'object') {
                throw new Error('var object must be of type object');
            }

            var defaults = {
                'selector': '',
                'controller': function () {},
                'template': '',
                'repeat': false,
                'protected': false
            };

            for (var prop in defaults) {
                if (!defaults.hasOwnProperty(prop)) {
                    continue;
                }

                if (prop in object) {
                    continue;
                }

                object[prop] = defaults[prop];
            }

            if(!object.selector) {
                throw new Error('View component is missing a selector attribute');
            }

            stock[object.selector] = object;

            return this;
        },

        /**
         * Render
         *
         * Render all view components in a given scope.
         *
         * @param element
         * @returns view
         */
        render: function(element) {
            var self    = this;
            var list    = (element) ? element.childNodes : [];

            if(element.$lsSkip === true) {
                list = [];
            }

            // Run on tree
            for (var i = 0; i < list.length; i++) { // Loop threw all DOM children
                var node = list[i];

                if(1 !== node.nodeType) { // Skip text nodes
                    continue;
                }

                if(node.attributes && node.attributes.length) { // Loop threw child attributes
                    for (var x = 0; x < node.attributes.length; x++) {

                        //if (node.$lsSkip === true) { // Stop render if comp has set $lsSkip
                        //    break;
                        //}

                        var length  = node.attributes.length;
                        var attr    = node.attributes[x];

                        if(!stock[attr.nodeName]) {
                            continue; // No such view component
                        }

                        var comp = stock[attr.nodeName];

                        if (typeof comp.template === "function") { // If template is function and not string resolve it first
                            comp.template = container.resolve(comp.template);
                        }

                        if(!comp.template) { // Execute with no template
                            (function (comp, node, container) {
                                execute(comp, node, container);
                            })(comp, node, container);

                            if(length !== node.attributes.length) {
                                x--;
                            }

                            continue;
                        }

                        node.classList.remove('load-end');
                        node.classList.add('load-start');

                        node.$lsSkip = true;

                        // Load new view template
                        http.get(comp.template)
                            .then(function(node, comp) {
                                    return function(data){
                                        node.$lsSkip = false;

                                        node.innerHTML = data;

                                        node.classList.remove('load-start');
                                        node.classList.add('load-end');

                                        (function (comp, node, container) { // Execute after template has been loaded
                                            execute(comp, node, container);
                                        })(comp, node, container);

                                        // re-render specific scope children after template is loaded
                                        self.render(node);
                                    }
                                }(node, comp),
                                function(error) {
                                    throw new Error('Failed to load comp template: ' + error.message);
                                }
                            );
                    }
                }

                if(true !== node.$lsSkip) { // ELEMENT told not to render child nodes
                    this.render(node);
                }
            }

            element.dispatchEvent(new window.Event('rendered', {bubbles: false}));
        }
    }
}, true);