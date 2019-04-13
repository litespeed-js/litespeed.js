/**
 * Container
 *
 * Uses as container for application services
 */
let container = function() {

    let stock = [];

    let cachePrefix  = 'none';

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
     * @returns container
     */
    let set = function(name, object, singleton, cache) {
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
            instance: null
        };

        return this;
    };

    let memory = {};

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

            if(name !== 'window' && name !== 'document' && name !== 'element' && typeof instance === 'object' && instance !== null) {
                instance = new Proxy(instance, {
                    name: service.name,

                    get: function(obj, prop) {

                        if(prop === "__name") {
                            return this.name;
                        }

                        if (typeof obj[prop] === 'object' && obj[prop] !== null) {
                            let handler = Object.assign({}, this);

                            handler.name = handler.name + '.' + prop;

                            return new Proxy(obj[prop], handler)
                        }
                        else {
                            return obj[prop];
                        }

                    },
                    set: function(obj, prop, value, receiver) {
                        obj[prop] = value;

                        let path = receiver.__name + '.' + prop;

                        console.log('updated', path + '.changed', receiver, obj);

                        document.dispatchEvent(new CustomEvent(path + '.changed'));

                        return true;
                    },
                });
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

    let path = function(path, value) {
        path = path
            .split('.')
        ;

        let object = this.get(path.shift());

        // Iterating path
        while (path.length > 1) {
            if(undefined == object) {
                return null;
            }

            object = object[path.shift()];
        }

        // Set new value
        if(undefined != value) {
            return object[path.shift()] = value;
        }

        // Return null when missing path
        if(undefined == object) {
            return null;
        }

        let shift = path.shift();

        if(undefined == shift) {
            return object;
        }

        return object[shift];
    };

    let container = {
        set: set,
        get: get,
        resolve: resolve,
        path: path,
        setCachePrefix: setCachePrefix,
        getCachePrefix: getCachePrefix
    };

    set('container', container, true);

    return container;
}();