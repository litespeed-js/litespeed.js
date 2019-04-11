container.set('cookie', function(document) {

    function get(name) {
        let value = "; " + document.cookie,
            parts = value.split("; " + name + "=");

        if (parts.length === 2) {
            return parts.pop().split(";").shift();
        }

        return null;
    }

    function set(name, value, days) {
        let date = new Date();

        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

        let expires = (0 < days ) ? 'expires=' + date.toUTCString() : 'expires=0';

        document.cookie = name + "=" + value + ";" + expires + ";path=/";

        return this;
    }

    return {
        'get': get,
        'set': set
    }
}, true);