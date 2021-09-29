window.ls.container.set('router', function(window) {

    /**
     * Takes a valid URL and return a JSON based object with all params.
     * This function support URL array syntax (x[]=1)
     *
     * As published at StackOverflow:
     * @see http://stackoverflow.com/a/8486188
     *
     * @param {string} uri
     * @return {any}
     */
    let getJsonFromUrl = function (uri) {
        let query;

        if(uri) {
            if(url.startsWith('/')) {
                url = window.location.origin + url;
            }
            query = new URL(uri);
            query = query.searchParams;
        } else {
            query = location.search;
        }

        const params = new URLSearchParams(location.search);

        return Object.fromEntries(params)
    };

    let states      = [];
    let params      = getJsonFromUrl();
    let hash        = window.location.hash;
    let current     = null;
    let previous    = null;

    /**
     * Get previous state scope
     *
     * @return {any}
     */
    let getPrevious = () => previous;

    /**
     * Get current state scope
     *
     * @return {any}
     */
    let getCurrent = () => current;

    /**
     * Set previous state scope
     *
     * @param {any} value
     * @return {any}
     */
    let setPrevious = (value) => {
        previous = value;
        return this;
    };

    /**
     * Set current state scope
     *
     * @param {any} value
     * @return {any}
     */
    let setCurrent = (value) => {
        current = value;
        return this;
    };

    /**
     * Set Param
     *
     * Set a new key & value pair to current scope
     *
     * @param {string} key
     * @param {any} value
     * @return {function}
     */
    let setParam = function(key, value) {
        params[key] = value;
        return this;
    };

    /**
     * Get Param
     *
     * Returns param value or default if not exists
     *
     * @param {string} key
     * @param {any} def
     * @return {any}
     */
    let getParam = function (key, def) {
        if (key in params) {
            return params[key];
        }

        return def;
    };

    /**
     * Get Params
     *
     * Returns all params
     *
     * @return {any}
     */
    let getParams = function () {
        return params;
    };

    /**
     * Return current state URL
     * @return {string}
     */
    let getURL = function () {
        return window.location.href;
    };

    /**
     * State
     *
     * Adds a new application state.
     *
     * @param {string} path
     * @param {object} view 
     * @return {object}
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
     * @param {object} location 
     * @return {object|null}
     */
    let match = function(location) {
        let url = location.pathname;

        if(url.substr(-1) === '/') {
            url = url.substr(0, str.length - 1);
        }

        states.sort(function(a, b){ return b.path.length - a.path.length;}); // order by length

        states.sort(function(a, b) {
            let n = b.path.split('/').length - a.path.split('/').length;

            if(n !== 0) {
                return n;
            }

            return b.path.length - a.path.length;
        }); // order by number of paths parts

        for (let i = 0; i < states.length; i++) {
            let value       = states[i];
                value.path  = (value.path.substring(0, 1) !== '/') ? location.pathname + value.path : value.path; // Support for relative paths
            let match       = new RegExp("^" + value.path.replace(/:[^\s/]+/g, '([\\w-]+)') + "$");
            let found       = url.match(match);

            if(found) {
                previous = current;
                current = value;

                return value;
            }
        }

        return null;
    };

    /**
     * Change current state to given URL
     *
     * @param {string} uri 
     * @param {bool} replace 
     * @return {object}
     */
    let change = function(uri, replace) {

        if(!replace) {
            window.history.pushState({}, '', uri);
        }
        else {
            window.history.replaceState({}, '', uri);
        }

        window.dispatchEvent(new PopStateEvent('popstate', {}));

        return this;
    };

    let reload = function () {
        return change(window.location.href);
    };

    return {
        setParam: setParam,
        getParam: getParam,
        getParams: getParams,
        getURL: getURL,
        add: add,
        change: change,
        reload: reload,
        match: match,
        getCurrent: getCurrent,
        setCurrent: setCurrent,
        getPrevious: getPrevious,
        setPrevious: setPrevious,
        params: params,
        hash: hash,
        reset: function () {
            this.params = getJsonFromUrl();
            this.hash = window.location.hash;
        }
    };
}, true, true);
