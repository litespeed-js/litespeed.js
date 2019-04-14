container.get('view').add({
    selector: 'data-ls-if',
    controller: function(element, expression, $as, $prefix) {
        let result  = '';
        let syntax  = element.dataset['lsIf'] || '';
        let debug   = element.dataset['debug'] || false;
        let paths   = [];
        let check   = function () {
            if(debug) {
                console.info('debug-ls-if', expression.parse(syntax, 'undefined', $as, $prefix));
            }

            try {
                result = !!(eval(expression.parse(syntax, 'undefined', $as, $prefix).replace(/(\r\n|\n|\r)/gm, ' '))); // Remove all line breaks to avoid evaluation error
            }
            catch (error) {
                throw new Error('Failed to evaluate expression "' + syntax + '": ' + error);
            }

            paths = expression.getPaths();

            //element.$lsSkip = !result;

            if(!result) {
                element.style.visibility = 'hidden';
                element.style.display = 'none';
            }
            else {
                element.style.removeProperty('display');
                element.style.removeProperty('visibility');
            }
        };

        check();

        for(let i = 0; i < paths.length; i++) {
            container.bind(element, paths[i], check);
        }
    }
});