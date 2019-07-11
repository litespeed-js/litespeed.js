window.ls.container.set('expression', function(container, filter) {
    let paths   = [];

    return {
        regex: /(\{{.*?\}})/gi,

        /**
         * @param string string
         * @param def string
         * @param as string
         * @param prefix string
         * @param cast bool
         * @returns {string}
         */
        parse: function(string, def, as, prefix, cast = false) {
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
                    let result = container.path(path, undefined, as, prefix);

                    path = (path.indexOf('.') > -1) ? path.replace(as + '.', prefix + '.') : path.replace(as, prefix);

                    if(!paths.includes(path)) {
                        paths.push(path);
                    }

                    if(null === result || undefined === result) {
                        result = def;
                    }
                    else if(typeof result === 'object') {
                        result = JSON.stringify(result);
                    }
                    else if(((typeof result === 'object') || (typeof result === 'string')) && cast) { // Auto casting for vars
                        result = '\'' + result + '\'';
                    }

                    if(reference.length >= 2) {
                        for(let i=1;i<reference.length;i++) {
                            result = filter.apply(reference[i], result);
                        }
                    }

                    return result;
                }
            );
        },
        getPaths: () => paths,
    }
}, true, false);