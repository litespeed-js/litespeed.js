window.ls.container.set('expression', function(container, filter, $as, $prefix) {
    let reg = /(\{{.*?\}})/gi;
    let paths = [];

    return {

        /**
         * @param string string
         * @param def string
         * @param as
         * @param prefix
         * @returns {string}
         */
        parse: function(string, def, as, prefix, cast = false) {
            def = def || '';
            paths = [];

            return string.replace(reg, function(match)
                {
                    let reference = match.substring(2, match.length -2)
                        .replace('[\'', '.')  // Make syntax consistent using only dot nesting
                        .replace('\']', '')  // Make syntax consistent using only dot nesting
                        .trim() // Clear whitespaces
                    ;

                    reference = reference.split('|');

                    let path = (reference[0] || '');
                    let result = container.path(path, undefined, as, prefix);

                    if (!paths.includes(path)) {
                        paths.push(path);
                    }

                    result = (null === result || undefined === result) ? def : result;

                    result = (typeof result === 'object') ? JSON.stringify(result) : result;

                    result = (((typeof result === 'object') || (typeof result === 'string')) && cast) ? '\'' + result + '\'' : result; // Auto casting for vars

                    if(reference.length >= 2) {
                        for(let i=1;i<reference.length;i++) {
                            result = filter.apply(reference[i], result);
                        }
                    }

                    return result;
                }
            );
        },
        getPaths: function () {
            return paths;
        },
    }
}, true, false, false);