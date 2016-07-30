Object.path = function(object, path, value) {
    path = path.split('.');

    // Iterating path
    while (path.length > 1) {
        object = object[path.shift()];
    }

    // Set new value
    if(undefined !== value) {
        return object[path.shift()] = value;
    }

    // Return null when missing path
    if(undefined == object) {
        return null;
    }

    return object[path.shift()];
};

Object.merge = function(obj1, obj2) {
    var obj3 = {}, attrname;

    for (attrname in obj1) {
        if (obj1.hasOwnProperty(attrname)) {
            obj3[attrname] = obj1[attrname];
        }
    }

    for (attrname in obj2) {
        if (obj2.hasOwnProperty(attrname)) {
            obj3[attrname] = obj2[attrname];
        }
    }

    return obj3;
};

Object.observe = function(obj) {
    var keys = Object.keys(obj);

    for(var k=0; k < keys.length; k++) {

        var key = keys[k];

        (function(key){

            var keyName = key+'value';
            var oldKeyName = 'old'+key+'value';

            obj[oldKeyName] = obj[key];

            Object.defineProperty(obj, key, {
                get: function() { return this[keyName]; },
                set: function(newValue) {

                    console.log('old-value: ',this[oldKeyName]);
                    console.log('new-value: ',newValue);

                    this[keyName] = newValue;
                    this[oldKeyName] = this[keyName];

                }
            });



        })(key);
    }
};

Object.observeNested = function(obj, callback) {
    Object.observe(obj, function(changes){
        changes.forEach(function(change) {
            if (typeof obj[change.name] == 'object') {
                Object.observeNested(obj[change.name], callback);
            }
        });

        callback.apply(this, arguments);
    });
};
