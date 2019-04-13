container.get('view').add({
    selector: 'data-ls-loop',
    template: false,
    repeat: false,
    nested: false,
    controller: function(element, view, container, window) {
        let expr  = element.dataset['lsLoop'];
        let echo  = function() {
            let array = container.path(expr);

            array = (!array) ? [] : array; // Cast null to empty array

            while(element.hasChildNodes() ) { // Clean DOM before loop starts
                element.removeChild(element.lastChild);
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
                children[prop] = children[prop] || element.backup.cloneNode(true);

                element.appendChild(children[prop]);

                (function (index) {
                    let context = expr + '.' + index;

                    container.set(element.dataset['lsAs'], container.path(context), true);
                    container.set('$index', index, true);

                    view.render(children[prop]);
                })(prop);
            }
        };

        element.template = (element.template) ? element.template : (element.children.length === 1) ? element.children[0].innerHTML : ''; // Save template for case we will need to re-render

        if(!element.backup) {
            element.backup = (element.children.length === 1) ? element.children[0] : window.document.createElement('li');
        }

        echo();

        document.addEventListener(expr.split('.')[0] + '.changed', function () {
            echo();
        });
    }
});