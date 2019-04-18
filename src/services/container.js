window.ls = window.ls || {};

/**
 * Container
 *
 * Uses as container for application services
 */
window.ls.container = function() {

    let stock = {};

    let cachePrefix  = 'none';

    let memory = {};

    let setCachePrefix = function (prefix) {
        cachePrefix = prefix;
        return this;
    };

    let getCachePrefix = function () {
        return cachePrefix;
    };

    /**
     * Register
     *
     * Adds a new service definition to application services stack.
     *
     * @param name string
     * @param object callback|object
     * @param singleton bool
     * @param cache bool
     * @param watch bool
     * @returns container
     */
    let set = function(name, object, singleton, cache = false, watch = true) {
        if(typeof name !== 'string') {
            throw new Error('var name must be of type string');
        }

        if(typeof singleton !== 'boolean') {
            throw new Error('var singleton "' + singleton + '" of service "' + name + '" must be of type boolean');
        }

        if(cache) {
            window.localStorage.setItem(getCachePrefix() + '.' + name, JSON.stringify(object));
        }

        stock[name] = {
            name: name,
            object: object,
            singleton: singleton,
            instance: null,
            watch: watch,
        };

        return this;
    };

    /**
     * Get Service
     *
     * Return service instance
     *
     * @param name
     * @returns {*}
     */
    let get = function(name) {
        let service = (undefined !== stock[name]) ? stock[name] : null;

        if(null === service) {

            if(memory[getCachePrefix() + '.' + name]) {
                return memory[getCachePrefix() + '.' + name];
            }

            let cached = window.localStorage.getItem(getCachePrefix() + '.' + name);

            if(cached) {
                cached = JSON.parse(cached);
                memory[getCachePrefix() + '.' + name] = cached;

                return cached;
            }

            return null;
        }

        if(service.instance === null) {
            let instance = (typeof service.object === 'function') ? this.resolve(service.object) : service.object;
            let skip = false;

            if(service.watch && name !== 'window' && name !== 'document' && name !== 'element' && typeof instance === 'object' && instance !== null) {

                let handler = {
                    name: service.name,

                    watch: function() {},

                    get: function(target, key) {
                        if(key === 'title') {
                            console.log('key', this.name + '.' + key, container.get('element'), document.body.contains(container.get('element')));
                        }

                        if(key === "__name") {
                            return this.name;
                        }

                        if(key === "__watch") {
                            return this.watch;
                        }

                        if(key === "__proxy") {
                            return true;
                        }

                        if (typeof target[key] === 'object' && target[key] !== null && !target[key].__proxy) {
                            let handler = Object.assign({}, this);

                            handler.name = handler.name + '.' + key;

                            return new Proxy(target[key], handler)
                        }
                        else {
                            return target[key];
                        }
                    },
                    set: function(target, key, value, receiver) {
                        if(key === "__name") {
                            return this.name = value;
                        }

                        if(key === "__watch") {
                            return this.watch = value;
                        }

                        target[key] = value;

                        let path = receiver.__name + '.' + key;

                        console.log('triggered', path + '.changed', key, value);

                        document.dispatchEvent(new CustomEvent(path + '.changed'));


                        if(skip) { // Avoid endless loop, when watch callback triggers changes itself
                            return true;
                        }

                        skip = true;

                        container.set('$prop', key, true);
                        container.set('$value', value, true);

                        container.resolve(this.watch);

                        container.set('$key', null, true);
                        container.set('$value', null, true);

                        skip = false;

                        return true;
                    },
                };

                instance = new Proxy(instance, handler);
            }


            if(service.singleton) {
                service.instance = instance;
            }

            return instance;
        }

        return service.instance;
    };

    let resolve = function(target) {
        if(!target) {
            return function () {

            };
        }

        let self = this;
        let FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
        let text = target.toString() || '';
        let args = text.match(FN_ARGS)[1].split(',');

        return target.apply(target, args.map(function(value) {
            return self.get(value.trim());
        }));
    };

    let path = function(path, value, as, prefix) {
        as = (as) ? as : container.get('$as');
        prefix = (prefix) ? prefix : container.get('$prefix');

        path = path
            .replace(as, prefix)
            .split('.');

        let name    = path.shift();
        let object  = this.get(name);
        let result  = null;

        // Iterating path
        while (path.length > 1) {
            if(undefined === object) {
                return null;
            }

            object = object[path.shift()];
        }

        // Set new value
        if(undefined !== value) {
            object[path.shift()] = value;
            return true;
        }

        // Return null when missing path
        if(undefined === object) {
            return null;
        }

        let shift = path.shift();

        if(undefined === shift) {
            result = object;
        }
        else {
            return object[shift];
        }

        return result;
    };

    let bind = function(element, path, callback, as, prefix) {
        as = (as) ? as : container.get('$as');
        prefix = (prefix) ? prefix : container.get('$prefix');

        let event = path.replace(as, prefix) + '.changed';
        let printer = function () {
            if(!document.body.contains(element)) { // Clean DOM
                element = null;
                document.removeEventListener(event, printer, false);

                return false;
            }

            //console.log('registered', event, element);

            callback();
        };

        document.addEventListener(event, printer);
    };

    let container = {
        set: set,
        get: get,
        resolve: resolve,
        path: path,
        bind: bind,
        setCachePrefix: setCachePrefix,
        getCachePrefix: getCachePrefix
    };

    set('container', container, true, false, false);

    return container;
}();