# Cookie

The cookie service allows to gain easy get and set access for client side cookies data.

## API

- [set()](#set)
- [get()](#get)

### set()

Set a new cookie

Param | Type | Description
--- | --- | ---
**name** | string | Name of the cookie
**value** | string | Value of cookie to set
**days** | numeric | Number of days for cookie to be set

#### Return Value

Returns cookie object instance.

#### Example
```js
cookie.set('myCookieName', 'myCookieValue', 7 /* days */);
```

### get()

Get cookie value by cookie name

Param | Type | Description
--- | --- | ---
**name** | string | Name of the cookie

#### Return Value

Value of requested cookie or null if no cookie was found.

#### Example
```js
let value = cookie.get('myCookieName'); // string value
```