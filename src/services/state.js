container.set('state', function(window) {

    let states      = [];
    let current     = null;
    let previous    = null;

    let getPrevious = function () {
        return previous;
    };

    let setPrevious = function (value) {
        previous = value;
        return this;
    };

    let getCurrent= function () {
        return current;
    };

    let setCurrent = function (value) {
        current = value;
        return this;
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
    let setParam = function(key, value) {
        state.params[key] = value;
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
    let getParam = function (key, def) {
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
    let getParams = function () {
        return state.params;
    };

    /**
     * Return current state URL
     * @returns {string}
     */
    let getURL = function () {
        return window.location.href;
    };

    let reset   = function () {
        state.params = getJsonFromUrl(window.location.search);
        state.hash = window.location.hash;
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
    let add = function(path, view) {

        /**
         * Validation
         */
        if(typeof path !== 'string') {
            throw new Error('path must be of type string');
        }

        if(typeof view !== 'object') {
            throw new Error('view must be of type object');
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
    let match = function(location) {
        let url = location.pathname + ((location.hash) ? location.hash : '');

        states.sort(function(a, b){ return b.path.length - a.path.length;}); // order by length

        states.sort(function(a, b) {
            let n = b.path.split('/').length - a.path.split('/').length;

            if(n !== 0) {
                return n;
            }

            return b.path.length - a.path.length;
        }); // order by number of paths parts

        for (let i = 0; i < states.length; i++) {
            let value   = states[i],
                match   = new RegExp("^" + value.path.replace(/:[^\s/]+/g, '([\\w-]+)') + "$");
            let found = url.match(match);

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
     * @param replace bool
     */
    let change = function(URL, replace) {

        if(!replace) {
            window.history.pushState({}, '', URL);
        }
        else {
            window.history.replaceState({}, '', URL);
        }

        window.dispatchEvent(new PopStateEvent('popstate', {}));

        return this;
    };

    let reload = function () {
        return change(window.location.href);
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
    let getJsonFromUrl = function (URL) {
        let query;

        if(URL) {
            let pos = location.href.indexOf('?');
            if(pos===-1) return [];
            query = location.href.substr(pos+1);
        } else {
            query = location.search.substr(1);
        }

        let result = {};

        query.split('&').forEach(function(part) {
            if(!part) {
                return;
            }

            part = part.split('+').join(' '); // replace every + with space, regexp-free version

            let eq      = part.indexOf('=');
            let key     = eq>-1 ? part.substr(0,eq) : part;
            let val     = eq>-1 ? decodeURIComponent(part.substr(eq+1)) : '';
            let from    = key.indexOf('[');

            if(from===-1) {
                result[decodeURIComponent(key)] = val;
            }
            else {
                let to = key.indexOf(']');
                let index = decodeURIComponent(key.substring(from+1,to));

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

    let state = {
        setParam: setParam,
        getParam: getParam,
        getParams: getParams,
        getURL: getURL,
        add: add,
        change: change,
        reload: reload,
        reset: reset,
        match: match,
        getCurrent: getCurrent,
        setCurrent: setCurrent,
        getPrevious: getPrevious,
        setPrevious: setPrevious,
        params: getJsonFromUrl(window.location.search),
        hash: window.location.hash
    };

    return state;
}, true);