window.ls.container.get('view').add({
    selector: 'data-ls-if',
    controller: function(element, expression, container, view, $as, $prefix) {
        let result  = '';
        let syntax  = element.getAttribute('data-ls-if') || '';
        let debug   = element.getAttribute('data-debug') || false;
        let paths   = [];
        let check   = () => {
            if(debug) {
                console.info('debug-ls-if', expression.parse(syntax, 'undefined', $as, $prefix));
            }

            try {
                result = !!(eval(expression.parse(syntax, 'undefined', $as, $prefix, true).replace(/(\r\n|\n|\r)/gm, ' '))); // Remove all line breaks to avoid evaluation error
            }
            catch (error) {
                throw new Error('Failed to evaluate expression "' + syntax + ' (resulted with: "' + result + '")": ' + error);
            }

            if(debug) {
                console.info('debug-ls-if result:', result);
            }

            paths = expression.getPaths();

            let prv = element.$lsSkip;

            element.$lsSkip = !result;

            if(!result) {
                element.style.visibility = 'hidden';
                element.style.display = 'none';
            }
            else {
                element.style.removeProperty('display');
                element.style.removeProperty('visibility');
            }

            if(prv === true && element.$lsSkip === false) {
                view.render(element)
            }
        };

        check();

        for(let i = 0; i < paths.length; i++) {
            container.bind(element, paths[i], check);
        }
    }
});