/**
 * Code solution inspired by:
 * http://codereview.stackexchange.com/questions/13443/jquery-plugin-node-tojson-convert-html-form-to-js-object
 */
view.add({
    name: 'ls-submit',
    selector: 'data-ls-submit',
    template: false,
    controller: function(element) {
        function parse(element) {
            var elements = element.children;

            if(!elements.length) {
                return element.value;
            }
            else if('SELECT' == element.tagName) {
                return element.children[element.selectedIndex].value;
            }

            var json = {};

            Array.prototype.forEach.call(elements, function(value, key) {
                if (!value.hasAttribute('name')) {
                    return;
                }

                var name        = value.getAttribute('name');
                var type        = value.getAttribute('type');
                var siblings    = 0;

                for (var i = 0; i < value.parentNode.children.length; i++) {
                    if(value.parentNode.children[i].getAttribute('name') == name) {
                        siblings++;
                    }
                }

                if(1 < siblings) { // Handle array
                    if( type == 'checkbox' && !value.checked) return true;
                    if( type == 'radio' && !value.checked) return true;
                    if(!json[name]) json[name] = [];

                    json[name].push(parse(value));
                }
                else { // Handle single key - value pair
                    json[name] = parse(value);
                }
            });

            return json;
        }

        element.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log(parse(element));
        });
    }
});