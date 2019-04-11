# Filter

The filter service allows you to register new filter and use them to format given values for user display or for integration with other services.

The filters listed in the filters service are the ones used by the '[data-ls-echo](/docs/views/echo.md)' view internally. 

## API

- [add(name, callback)](#add)
- [apply(name, value)](#apply)

### add()

Register a new filter

Param | Type | Description
--- | --- | ---
**name** | string | Name of the new filter
**callback** | callable | Filter function that accept the user value and return the new one

#### Return Value

Returns filter object instance.

#### Example

```js
filter.add('uppercase', function (value) {
    return value.toUpperCase();
});
```

### apply()

Applies a filter function on a given value

Param | Type | Description
--- | --- | ---
**name** | string | Name of the filter
**value** | mixed | Value to format

#### Return Value

Filter callback result.

#### Example

```js
let result = filter.apply('john doe', 'uppercase'); // JOHN DOE
```

## Predefined Filters

Name | Description
--- | ---
**uppercase** | Convert given string to upper case letters
**lowercase** | Convert given string to lower case letters

Think we should add more predefined filters? send us a pull request or open an issue for us to review.
