# State

The state service manages the application state registration and routing logic.

## API

- [add(path, view)](#add)
- [change(url, replace)](#change)
- [reload()](#reload)
- [match(location)](#match)
- [getCurrent()](#getCurrent)
- [getPrevious()](#getPrevious)

## Attributes

- [params](params)

### add()

Add a new state to the app states list. When a the app init or when a URL changes the [match](#match) method will check all states to find a state that matches the current URL.

Param | Type | Description
--- | --- | ---
**path** | string | State URL path
**view** | object | State [view object]((#/docs/services/view.md))

#### Example
```js
state.add('/contact-us', {
    'template': '/templates/contact-us.html',
    'repeat': false,
});
```

### change()

Change app current state. Use the replace param to control whether the new state should replace current state in History API or added as a new state. This mainly affects the behaviour of the browser back button. 

Param | Type | Description
--- | --- | ---
**url** | string | New state URL
**replace** | boolean | Add new state or replace current one

#### Example
```js
state.change('/new-view', false);
```