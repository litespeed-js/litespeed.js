window.ls.container.get('view').add({
    selector: 'data-ls-loop',
    template: false,
    repeat: false,
    nested: false,
    controller: function(element, view, container, window) {
        let expr  = element.getAttribute('data-ls-loop');
        let as    = element.getAttribute('data-ls-as');
        let echo  = function() {
            let array = container.path(expr);

            array = (!array) ? [] : array; // Cast null to empty array

            while(element.hasChildNodes() ) { // Clean DOM before loop starts
                element.removeChild(element.lastChild);

                element.lastChild = null;
            }

            if(array instanceof Array && typeof array !== 'object') {
                throw new Error('Reference value must be array or object. ' + (typeof array) + ' given');
            }

            let children = [];

            element.$lsSkip = true;

            element.style.visibility = (0 === array.length) ? 'hidden' : 'visible';

            for (let prop in array) {
                if (!array.hasOwnProperty(prop)) {
                    continue;
                }

                // Create new child element and apply template
                children[prop] = template.cloneNode(true);

                element.appendChild(children[prop]);

                (function (index) {
                    let context = expr + '.' + index;

                    container.set(as, container.path(context), true);
                    container.set('$index', index, true, false, false);
                    container.set('$prefix', context, true, false, false);
                    container.set('$as', as, true, false, false);

                    view.render(children[prop]);
                })(prop);
            }

            container.set('$index', null, true, false, false);
            container.set('$prefix', '', true, false, false);
            container.set('$as', '', true, false, false);
        };

        let template = (element.children.length === 1) ? element.children[0] : window.document.createElement('li');

        echo();

        container.bind(element, expr, echo);
        container.bind(element, expr + '.length', echo);
    }
});