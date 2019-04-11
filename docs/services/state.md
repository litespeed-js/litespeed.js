# State

The state service manages the application state registration and routing logic.

## API

- [setParam(key, value)](#setParam)
- [getParam(key, def)](#getParam)
- [getParams()](#getParams)
- [reset()](#reset)
- [change(url, replace)](#change)
- [reload()](#reload)
<!-- - [getURL()](#getURL) -->
- [add(path, view)](#add)
- [match(location)](#match)
- [getCurrent()](#getCurrent)
- [setCurrent()](#setCurrent)
- [getPrevious()](#getPrevious)
- [setPrevious()](#setPrevious)

## Attributes

- [params](params)

### set()

Set a new cookie

Param | Type | Description
--- | --- | ---
**name** | string | Name of the cookie
**value** | string | Value of cookie to set
**days** | numeric | Number of days for cookie to be set

#### Example
```js
cookie.set('myCookieName', 'myCookieValue', 7 /* days */);
```

### get()

Get cookie value by cookie name

Param | Type | Description
--- | --- | ---
**name** | string | Name of the cookie

#### Example
```js
let value = cookie.get('myCookieName'); // string value
```