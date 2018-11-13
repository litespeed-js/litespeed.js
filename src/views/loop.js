container.get('view').add({
    selector: 'data-ls-loop',
    template: false,
    repeat: true,
    nested: false,
    controller: function(element, view, container, window) {
        var array = container.path(element.dataset['lsLoop']);

        array = (!array) ? [] : array; // Cast null to empty array

        element.template    = (element.template) ? element.template : (element.children.length === 1) ? element.children[0].innerHTML : ''; // Save template for case we will need to re-render

        if(!element.clone) {
            element.clone = (element.children.length === 1) ? element.children[0] : window.document.createElement('li');
        }

        element.innerHTML   = '';

        if(array instanceof Array && typeof array !== 'object') {
            throw new Error('Reference value must be array or object. ' + (typeof array) + ' given');
        }

        var children = [];

        element.$lsSkip = true;

        element.style.visibility = (0 === array.length) ? 'hidden' : 'visible';

        for (var prop in array) {
            if (!array.hasOwnProperty(prop)) {
                continue
            }

            // Create new child element and apply template
            children[prop] = children[prop] || element.clone.cloneNode(true);
            children[prop] = element.clone.cloneNode(true);
            children[prop].innerHTML = element.template;

            element.appendChild(children[prop]);

            (function (index) {
                var context = element.dataset['lsLoop'] + '.' + index;

                container.set(element.dataset['lsAs'], container.path(context), true);

                view.render(children[prop]);
            })(prop);

            // Listen for DOM changes and add bind context + re-render changed elements
            children[prop].addEventListener("template-loaded", (function(prop) {
                var callback = function(event) {
                    (function (index) {
                        container.set(element.dataset['lsAs'], container.path(element.dataset['lsLoop'] + '.' + index), true);

                        view.render(event.target);
                    })(prop);

                    children[prop].removeEventListener("template-loaded", callback, false);
                };

                return callback;
            })(prop), false);
        }
    }
});