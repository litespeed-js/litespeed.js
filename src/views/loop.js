window.ls.container.get('view').add({
    selector: 'data-ls-loop',
    template: false,
    repeat: false,
    nested: false,
    controller: function(element, view, container, window, expression) {
        let expr  = expression.parse(element.getAttribute('data-ls-loop'));
        let as    = element.getAttribute('data-ls-as');
        let limit = parseInt(expression.parse(element.getAttribute('data-limit') || '') || -1);
        let debug = element.getAttribute('data-debug') || false;
        let echo  = function() {
            let array = container.path(expr);
            let counter = 0;

            array = (!array) ? [] : array; // Cast null to empty array

            let watch = !!(array && array.__proxy);

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

                if(counter == limit) {
                    break;
                }

                counter++;

                if (!array.hasOwnProperty(prop)) {
                    continue;
                }

                // Create new child element and apply template
                children[prop] = template.cloneNode(true);

                element.appendChild(children[prop]);

                (index => {
                    let context = expr + '.' + index;

                    container.addNamespace(as, context);
                    
                    if(debug) {
                        console.info('debug-ls-loop', 'index', index);
                        console.info('debug-ls-loop', 'context', context);
                        console.info('debug-ls-loop', 'context-path', container.path(context).name);
                        console.info('debug-ls-loop', 'namespaces', container.namespaces);
                    }

                    container.set(as, container.path(context), true, watch);
                    container.set('$index', index, true, false);

                    view.render(children[prop]);

                    container.removeNamespace(as);
                })(prop);
            }

            element.dispatchEvent(new Event('looped'));
        };

        let template = (element.children.length === 1) ? element.children[0] : window.document.createElement('li');

        echo();

        container.bind(element, expr + '.length', echo);

        let path = (expr + '.length').split('.');
        
        while(path.length) {
            container.bind(element, path.join('.'), echo);
            path.pop();
        }
    }
});