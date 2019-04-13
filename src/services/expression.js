/**
 * View
 *
 * Manage application scopes and different views
 */
container.set('expression', function(container, filter) {
    let reg = /(\{{.*?\}})/gi;
    let paths = [];

    return {

        /**
         * @param string string
         * @param def string
         * @returns {string}
         */
        parse: function(string, def) {
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
                    let result = container.path(path);

                    paths.push(path);

                    result = (null === result || undefined === result) ? def : result;

                    result = (typeof result === 'object') ? JSON.stringify(result) : result;

                    if(reference.length >= 2) {
                        for(let i=1;i<reference.length;i++) {
                            result = filter.apply(result, reference[i], {});
                        }
                    }

                    return result;
                }
            );
        },
        getPaths: function () {
            return paths;
        }
    }
}, true);