window.ls.container.set('expression', function(container, filter) {
    let paths   = [];

    return {
        regex: /(\{{.*?\}})/gi,

        /**
         * @param string string
         * @param def string
         * @param cast bool
         * @returns {string}
         */
        parse: function(string, def, cast = false) {
            def = def || '';
            paths = [];

            return string.replace(this.regex, match =>
                {
                    let reference = match.substring(2, match.length -2)
                        .replace('[\'', '.')  // Make syntax consistent using only dot nesting
                        .replace('\']', '')  // Make syntax consistent using only dot nesting
                        .trim() // Clear whitespaces
                    ;

                    reference = reference.split('|');

                    let path = (reference[0] || '');
                    let result = container.path(path);

                    path = container.scope(path);

                    if(!paths.includes(path)) {
                        paths.push(path);
                    }

                    if(reference.length >= 2) {
                        for(let i=1;i<reference.length;i++) {
                            result = filter.apply(reference[i], result);
                        }
                    }

                    if(null === result || undefined === result) {
                        result = def;
                    }
                    else if(typeof result === 'object') {
                        result = JSON.stringify(result, null, 4);
                    }
                    else if(((typeof result === 'object') || (typeof result === 'string')) && cast) { // Auto casting for vars
                        result = '\'' + result + '\'';
                    }

                    return result;
                }
            );
        },
        getPaths: () => paths,
    }
}, true, false);