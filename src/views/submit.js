
var view = require('view');

view.add({
    name: 'ls-submit',
    selector: 'data-ls-submit',
    template: false,
    controller: function(element, container) {
        element.addEventListener('submit', function(event) {
            event.preventDefault();

            container.get('messages').add('Saved Successfully!', 2.5);

            /**
             * 1. Get list of parameters
             * 2. Sort parameters by function signature
             * 3. Apply parameters to function and execute it
             */
        });

        //element.nodeName
    }
});