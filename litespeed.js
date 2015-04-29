var request=env.require("request"),response=env.require("response"),router=env.require("router"),view=env.require("view"),App=function(){return{view:this.view,router:this.router}};
var environment;
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
/**
 * Created by eldadfux on 4/27/15.
 */

var router=function(){var t=[];return{state:function(r,n,o){if("string"!=typeof r)throw new Error("var path must be of type string");if("string"!=typeof n)throw new Error("var template must be of type string");if("function"!=typeof o)throw new Error("var controller must be of type function");return t[t.length++]={path:r,template:n,controller:o},this},match:function(){return t.forEach(function(r){var n=new RegExp(window.location.origin+r.path.replace(/:[^\s/]+/g,"([\\w-]+)")),o=window.location.href;return console.log(o.match(n)),o.match(n)?r:t.firstChild?t.firstChild:null})}}}();
var view=function(){var t=[];return{comp:function(r){if("object"!=typeof r)throw new Error("var object must be of type object");return t[t.length++]=r,this},render:function(r){var e=this;return console.log(r),t.forEach(function(t){for(var o=r.querySelectorAll(t.selector),n=0;n<o.length;n++){var c=o[n];c.style.background="#"+Math.floor(16777215*Math.random()).toString(16),c.style.opacity=".8",http.get(t.template).then(function(r){c.innerHTML=r,t.controller(c),e.render(c)},function(t){console.error("Failed!",t)})}}),this}}}();
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