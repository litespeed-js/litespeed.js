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

### apply()

Applies a filter function on a given value

Param | Type | Description
--- | --- | ---
**name** | string | Name of the filter
**value** | mixed | Value to format

#### Example

```js
let result = filter.apply('john doe', 'uppercase'); // JOHN DOE
```

#### Predefined Filters

Name | Description
--- | ---
**uppercase** | Convert given string to upper case letters
**lowercase** | Convert given string to lower case letters

Think we should add more predefined filters? send us a pull request to review.
