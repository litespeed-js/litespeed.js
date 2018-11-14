# Expression

The expression service parses Litespeed.js template syntax.

The main use for this service is to bind service value into views and view components like '[data-ls-echo](/docs/views/echo.md)' and '[data-ls-if](/docs/views/if.md)' rely on it heavily.

The expression parser detects service path references, evaluate them and parses the final results.

Litespeed.js expression also supports 'mustache' or 'twig' like filters to give a lot more flexibility and power. 

## API

- [parse()](#parse)

### parse()

Set a new cookie

Param | Type | Description
--- | --- | ---
**string** | string | Name of the cookie
**def** | string | Default value to print when reference results with null or undefined value, default to empty string **(optional)**

#### Example

```js
conatiner.set('user', {
    'name': 'john doe',
    'email': 'john@example.com'
}, true, true);

filter.add('uppercase', function (value) {
    return value.toUpperCase();
});

let name = expression.parse('hello {{user.name|uppercase}}'); // JOHN DOE
let empty = expression.parse('hello {{user.age|uppercase}}', 30); // 30
```