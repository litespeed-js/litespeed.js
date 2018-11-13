/**
 * Container
 *
 * Uses as container for application services
 */
var container = function() {

    var stock = [];

    var cachePrefix  = 'none';

    var setCachePrefix = function (prefix) {
        cachePrefix = prefix;
        return this;
    };

    var getCachePrefix = function () {
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
    var set = function(name, object, singleton, cache) {
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

    var memory = {};

    /**
     * Get Service
     *
     * Return service instance
     *
     * @param name
     * @returns {*}
     */
    var get = function(name) {
        var service = (undefined !== stock[name]) ? stock[name] : null;

        if(null === service) {

            if(memory[getCachePrefix() + '.' + name]) {
                return memory[getCachePrefix() + '.' + name];
            }

            var cached = window.localStorage.getItem(getCachePrefix() + '.' + name);

            if(cached) {
                cached = JSON.parse(cached);
                memory[getCachePrefix() + '.' + name] = cached;

                return cached;
            }

            return null;
        }

        if(service.instance === null) {
            var instance  = (typeof service.object === 'function') ? this.resolve(service.object) : service.object;

            if(service.singleton) {
                service.instance = instance;
            }

            return instance;
        }

        return service.instance;
    };

    var resolve = function(target) {
        if(!target) {
            return function () {

            };
        }

        var self = this;
        var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
        var text = target.toString() || '';
        var args = text.match(FN_ARGS)[1].split(',');

        return target.apply(target, args.map(function(value) {
            return self.get(value.trim());
        }));
    };

    var path = function(path, value) {
        path = path
            .split('.')
        ;

        var object = this.get(path.shift());

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

        var shift = path.shift();

        if(undefined == shift) {
            return object;
        }

        return object[shift];
    };

    var container = {
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