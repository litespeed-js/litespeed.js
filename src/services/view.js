/**
 * View
 *
 * Manage application scopes and different views
 */
window.ls.container.set('view', function(http, container) {
    let stock = {};

    let execute = function(view, node, container) {
        container.set('element', node, true, false);

        container.resolve(view.controller);

        if(true !== view.repeat) { // Remove view that should not repeat itself
            node.removeAttribute(view.selector);
        }
    };

    let parse = function (node, skip, callback) {

        if(node.tagName === 'SCRIPT') {
            return;
        }

        if(node.attributes && !skip) {
            let attrs = [];
            let attrsLen = node.attributes.length;

            for (let x = 0; x < attrsLen; x++) {
                attrs.push(node.attributes[x].nodeName);
            }

            if(1 !== node.nodeType) { // Skip text nodes
                return;
            }

            //console.log('in DOM?', document.body.contains(node), node, node.nodeType);

            if(attrs && attrsLen) { // Loop threw child attributes

                // if(node && node.parentNode && node.parentNode.replaceChild) { // Remove previous refs
                //     console.info('Clean DOM Node (single)', node);

                //     let new_element = node.cloneNode(true);

                //     node.parentNode.replaceChild(new_element, node);
                //     node = new_element;

                //     console.info('empty node', node);
                // }

                for (let x = 0; x < attrsLen; x++) {

                    if (node.$lsSkip) { // Stop render if comp has set $lsSkip
                        break;
                    }

                    let pointer = (!/Edge/.test(navigator.userAgent)) ? x : (attrsLen -1) - x;
                    let length  = attrsLen;
                    let attr    = attrs[pointer];

                    if(!stock[attr]) {
                        continue; // No such view component
                    }

                    let comp = stock[attr];

                    if (typeof comp.template === 'function') { // If template is function and not string resolve it first
                        comp.template = container.resolve(comp.template);
                    }

                    if(!comp.template) { // Execute with no template
                        (function (comp, node, container) {
                            execute(comp, node, container);
                        })(comp, node, container);

                        if(length !== attrsLen) {
                            x--;
                        }

                        if(callback) {
                            callback();
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
                                    parse(node, true);

                                    if(callback) {
                                        callback();
                                    }
                                }
                            }(node, comp),
                            function(error) {
                                throw new Error('Failed to load comp template: ' + error.message);
                            }
                        );
                }
            }
        }

        if(node.$lsSkip) { // ELEMENT told not to render child nodes
            return;
        }

        let list = (node) ? node.childNodes : [];

        if(node.$lsSkip) {
            list = [];
        }

        // Run on tree
        for (let i = 0; i < list.length; i++) { // Loop threw all DOM children
            let child = list[i];
            parse(child);
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
                throw new Error('object must be of type object');
            }

            let defaults = {
                'selector': '',
                'controller': function () {},
                'template': '',
                'repeat': false,
                'protected': false
            };

            for (let prop in defaults) {
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
        render: function(element, callback) {
            parse(element, false, callback);
            element.dispatchEvent(new window.Event('rendered', {bubbles: false}));
        }
    }
}, true, false);