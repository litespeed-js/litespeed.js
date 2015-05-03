var request = function() {

    var call = function(method, url, headers) {
        return new Promise(
            function(resolve, reject) {

                var xmlhttp = new XMLHttpRequest();

                xmlhttp.open(method, url, true);
                //xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");

                xmlhttp.onload = function() {
                    if (4 == xmlhttp.readyState && 200 == xmlhttp.status) {
                        resolve(xmlhttp.response);
                    }

                    reject(Error(xmlhttp.statusText));
                };

                // Handle network errors
                xmlhttp.onerror = function() {
                    reject(Error("Network Error"));
                };

                xmlhttp.send();
            }
        )
    };

    return {
        'get': function(url) {
            return call('GET', url, {})
        },
        'post': function(url, headers) {
            return call('POST', url, headers)
        },
        'put': function(url) {
            return call('PUT', url, {})
        },
        'delete': function(url) {
            return call('DELETE', url, {})
        }
    }
}();