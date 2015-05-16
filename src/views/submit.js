
var view = require('view');

view.add({
    name: 'ls-submit',
    selector: '[data-ls-submit]',
    isomorphic: true,
    template: false,
    controller: function(element) {
        console.log('submit', element);
        element.addEventListener('submit', function(event) {
            event.preventDefault();

            //alert('submit');

            /**
             * 1. Get list of parameters
             * 2. Sort parameters by function signature
             * 3. Apply parameters to function and execute it
             */

            var x = [ 'p0', 'p1', 'p2' ];
            call_me.apply(this, x);
        });

        //element.nodeName
    }
});