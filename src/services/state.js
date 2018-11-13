container.set('state', function(window) {

    var states      = [];
    var current     = null;
    var previous    = null;

    var getPrevious = function () {
        return previous;
    };

    var setPrevious = function (value) {
        previous = value;
        return this;
    };

    var getCurrent= function () {
        return current;
    };

    var setCurrent = function (value) {
        current = value;
        return this;
    };

    /**
     * Get Param
     *
     * Returns param value or default if not exists
     *
     * @param key
     * @param def
     * @returns {*}
     */
    var getParam = function (key, def) {
        if (key in state.params) {
            return state.params[key];
        }

        return def;
    };

    /**
     * Get Params
     *
     * Returns all params
     *
     * @returns {*}
     */
    var getParams = function () {
        return state.params;
    };

    /**
     * Set Param
     *
     * Set a new key & value pair to current scope
     *
     * @param key
     * @param value
     * @returns {setParam}
     */
    var setParam = function(key, value) {
        state.params[key] = value;
        return this;
    };

    var reset   = function () {
        state.params = getJsonFromUrl(window.location.search);
    };

    var getURL = function () {
        return window.location.href;
    };

    /**
     * State
     *
     * Adds a new application state.
     *
     * @param path string
     * @param view object
     * @returns this
     */
    var add = function(path, view) {

        /**
         * Validation
         */
        if(typeof path !== 'string') {
            throw new Error('var path must be of type string');
        }

        if(typeof view !== 'object') {
            throw new Error('var view must be of type object');
        }

        states[states.length++] = {/* string */ path: path, /* object */ view: view};

        return this;
    };

    /**
     * Match
     *
     * Compare current location and application states to find a match.
     *
     * Sort array of states based on:
     * http://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
     *
     * Regex is based on this StackOverflow topic:
     * @see http://stackoverflow.com/a/11809601
     *
     * New Regex is based on this post:
     * @see https://stackoverflow.com/a/40739605/2299554
     *
     * @param location object
     * @return value object|null
     */
    var match = function(location) {
        var url = location.pathname;

        states.sort(function(a, b){ return b.path.length - a.path.length;}); // order by length

        states.sort(function(a, b) {
            var n = b.path.split('/').length - a.path.split('/').length;

            if(n !== 0) {
                return n;
            }

            return b.path.length - a.path.length;
        }); // order by number of paths parts

        for (var i = 0; i < states.length; i++) {
            var value   = states[i],
                match   = new RegExp("^" + value.path.replace(/:[^\s/]+/g, '([\\w-]+)') + "$");

            var found = url.match(match);

            if(found) {
                previous = current;
                current = value;

                return value;
            }
        }

        return null
    };

    /**
     * Change current state to given URL
     *
     * @param URL string
     */
    var change = function(URL) {
        window.history.pushState({}, '', URL);
        window.dispatchEvent(new PopStateEvent('popstate', {}));
    };

    var reload = function () {
        change(window.location.href);
    };

    /**
     * Takes a valid URL and return a JSON based object with all params.
     * This function support URL array syntax (x[]=1)
     *
     * As published at StackOverflow:
     * @see http://stackoverflow.com/a/8486188
     *
     * @param URL string
     * @returns {*}
     */
    var getJsonFromUrl = function (URL) {
        var query;

        if(URL) {
            var pos = location.href.indexOf('?');
            if(pos==-1) return [];
            query = location.href.substr(pos+1);
        } else {
            query = location.search.substr(1);
        }

        var result = {};

        query.split('&').forEach(function(part) {
            if(!part) {
                return;
            }

            part = part.split('+').join(' '); // replace every + with space, regexp-free version

            var eq      = part.indexOf('=');
            var key     = eq>-1 ? part.substr(0,eq) : part;
            var val     = eq>-1 ? decodeURIComponent(part.substr(eq+1)) : '';
            var from    = key.indexOf('[');

            if(from==-1) {
                result[decodeURIComponent(key)] = val;
            }
            else {
                var to = key.indexOf(']');
                var index = decodeURIComponent(key.substring(from+1,to));

                key = decodeURIComponent(key.substring(0,from));

                if(!result[key]) {
                    result[key] = [];
                }

                if(!index) {
                    result[key].push(val);
                }
                else {
                    result[key][index] = val;
                }
            }
        });

        return result;
    };

    var state = {
        setParam: setParam,
        getParam: getParam,
        getParams: getParams,
        reset: reset,
        change: change,
        reload: reload,
        getURL: getURL,
        add: add,
        match: match,
        getCurrent: getCurrent,
        setCurrent: setCurrent,
        getPrevious: getPrevious,
        setPrevious: setPrevious,
        params: getJsonFromUrl(window.location.search)
    };

    return state;
}, true);