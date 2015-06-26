Object.path = function(object, string, value, returnParent) {
    string = string.split('.');

    while (string.length > 1)
        object = object[string.shift()];

    if(undefined !== value) {
        return object[string.shift()] = value;
    }

    if(returnParent) {
        return object;
    }

    return object[string.shift()];
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