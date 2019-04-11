# HTTP

The HTTP service allows you to create HTTP calls and receive javascript promises to manage your call response results.

All of Litespeed.js internal HTTP calls used by the framework are managed by the HTTP service.

Currently the HTTP service uses the XMLHttpRequest API to handle all HTTP calls but in future releases we do intend to start using the newer Fetch API. 

## API

- [get(url)](#get)
- [post(url, headers, payload)](#post)
- [put(url, headers, payload)](#put)
- [patch(url, headers, payload)](#patch)
- [delete(url)](#delete)
- [addGlobalParam(key, value)](#addGlobalParam)
- [addGlobalHeader(key, value)](#addGlobalHeader)

### get

Make and HTTP GET request

Param | Type | Description
--- | --- | ---
**url** | string | HTTP URL to the resource you want to request

This method returns a Javascript [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object.

#### Example

```js
http.get('https://example.com')
    .then(function (response) {
            // Handle Success
        }, function (error) {
            // Handle Error
        }
    );
```

### post

Make and HTTP POST request

Param | Type | Description
--- | --- | ---
**url** | string | HTTP URL to the resource you want to request
**headers** | object | HTTP headers object combined from key and values
**payload** | string | HTTP payload

This method returns a Javascript [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object.

#### Example

```js
http.post('https://example.com/resource', {'Content-type': 'application/json'}, '{name: "John", age: 31, city: "New York"}')
    .then(function (response) {
            // Handle Success
        }, function (error) {
            // Handle Error
        }
    );
```

### put

Make and HTTP PUT request

Param | Type | Description
--- | --- | ---
**url** | string | HTTP URL to the resource you want to request
**headers** | object | HTTP headers object combined from key and values
**payload** | string | HTTP payload

This method returns a Javascript [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object.

#### Example

```js
http.put('https://example.com/resource', {'Content-type': 'application/json'}, '{name: "John", age: 31, city: "New York"}')
    .then(function (response) {
            // Handle Success
        }, function (error) {
            // Handle Error
        }
    );
```

### patch

Make and HTTP PATCH request

Param | Type | Description
--- | --- | ---
**url** | string | HTTP URL to the resource you want to request
**headers** | object | HTTP headers object combined from key and values
**payload** | string | HTTP payload

This method returns a Javascript [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object.

#### Example

```js
http.patch('https://example.com/resource', {'Content-type': 'application/json'}, '{name: "John", age: 31, city: "New York"}')
    .then(function (response) {
            // Handle Success
        }, function (error) {
            // Handle Error
        }
    );
```

### delete

Make and HTTP DELETE request

Param | Type | Description
--- | --- | ---
**url** | string | HTTP URL to the resource you want to request

This method returns a Javascript [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object.

#### Example

```js
http.delete('https://example.com/resource')
    .then(function (response) {
            // Handle Success
        }, function (error) {
            // Handle Error
        }
    );
```