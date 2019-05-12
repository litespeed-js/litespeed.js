window.ls.container.set('http', function(document) {

    let globalParams    = [],
        globalHeaders   = [];

    let addParam = function(url, param, value) {
        param = encodeURIComponent(param);
        let a = document.createElement('a');
        param += (value ? "=" + encodeURIComponent(value) : "");
        a.href = url;
        a.search += (a.search ? "&" : "") + param;
        return a.href;
    };

    /**
     * @param method string
     * @param url string
     * @param headers string
     * @param payload string
     * @param progress callback
     * @returns Promise
     */
    let request = function(method, url, headers, payload, progress) {
        let i;

        if(-1 === ['GET', 'POST', 'PUT', 'DELETE', 'TRACE', 'HEAD', 'OPTIONS', 'CONNECT', 'PATCH'].indexOf(method)) {
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

        for (i = 0; i < globalParams.length; i++) { // Add global params to URL
            url = addParam(url, globalParams[i].key, globalParams[i].value);
        }

        return new Promise(
            function(resolve, reject) {
                let xmlhttp = new XMLHttpRequest();

                xmlhttp.open(method, url, true);

                xmlhttp.setRequestHeader('Ajax', '1');

                for (i = 0; i < globalHeaders.length; i++) { // Add global headers to request
                    xmlhttp.setRequestHeader(globalHeaders[i].key, globalHeaders[i].value);
                }

                // Set Headers
                for (let key in headers) {
                    if (headers.hasOwnProperty(key)) {
                        xmlhttp.setRequestHeader(key, headers[key]);
                    }
                }

                xmlhttp.onload = function() {
                    if (4 === xmlhttp.readyState && 200 === xmlhttp.status) {
                        resolve(xmlhttp.response);
                    }
                    else {
                        document.dispatchEvent(new CustomEvent('http-' + method.toLowerCase() + '-' + xmlhttp.status));
                        reject(new Error(xmlhttp.statusText));
                    }
                };

                if(progress) {
                    xmlhttp.addEventListener('progress', progress);
                    xmlhttp.upload.addEventListener('progress', progress, false);
                }

                // Handle network errors
                xmlhttp.onerror = function() {
                    reject(new Error("Network Error"));
                };

                xmlhttp.send(payload);
            }
        )
    };

    return {
        'get': function(url) {
            return request('GET', url, {}, '')
        },
        'post': function(url, headers, payload) {
            return request('POST', url, headers, payload)
        },
        'put': function(url, headers, payload) {
            return request('PUT', url, headers, payload)
        },
        'patch': function(url, headers, payload) {
            return request('PATCH', url, headers, payload)
        },
        'delete': function(url) {
            return request('DELETE', url, {}, '')
        },
        'addGlobalParam': function(key, value) {
            globalParams.push({key: key, value: value});
        },
        'addGlobalHeader': function(key, value) {
            globalHeaders.push({key: key, value: value});
        }
    }
}, true, false);