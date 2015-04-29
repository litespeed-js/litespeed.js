var http = function() {

    /**
     *
     * @param method string
     * @param url string
     * @param headers string
     * @param body string
     * @returns Promise
     */
    var request = function(method, url, headers, body) {

        if(-1 == ['GET', 'POST', 'PUT', 'DELETE', 'TRACE', 'HEAD', 'OPTIONS', 'CONNECT', 'PATCH'].indexOf(method)) {
            throw new Error('var method must contain a valid HTTP method name');
        }

        if(typeof url !== 'string') {
            throw new Error('var url must be of type string');
        }

        if(typeof headers !== 'object') {
            throw new Error('var headers must be of type object');
        }

        if(typeof url !== 'string') {
            throw new Error('var url must be of type string');
        }

        return new Promise(
            function(resolve, reject) {

                var xmlhttp = new XMLHttpRequest();

                xmlhttp.open(method, url, true);

                for (var key in headers) {
                    if (headers.hasOwnProperty(key)) {
                        xmlhttp.setRequestHeader(key, headers[key]);
                    }
                }

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

                xmlhttp.send(body);
            }
        )
    };

    return {
        'get': function(url) {
            return request('GET', url, {}, '')
        },
        'post': function(url, headers, params) {
            return request('POST', url, {'Content-type': 'application/x-www-form-urlencoded'}, '')
        },
        'put': function(url) {
            return request('PUT', url, {}, '')
        },
        'delete': function(url) {
            return request('DELETE', url, {}, '')
        }
    }
}();