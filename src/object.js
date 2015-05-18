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