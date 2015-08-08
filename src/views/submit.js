view.add({
    name: 'ls-submit',
    selector: 'data-ls-submit',
    template: false,
    controller: function(element, container) {
        var target = element.dataset['lsSubmit'];

        element.addEventListener('submit', function(event) {
            event.preventDefault();
            container.get('form').set(element);
            var route = container.get('router').match(target);
            console.log(route);
            //container.get('messages').add('Saved Successfully!', 2.5);
            /**
             * 1. Get list of parameters
             * 2. Sort parameters by function signature
             * 3. Apply parameters to function and execute it
             */
        });

        //element.nodeName
    }
});