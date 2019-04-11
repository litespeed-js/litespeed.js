# Container

The container service allows you to manage dependency injection across the application, have easy access to object or services and lazy-load, singleton or cache the creation of new service instances.

## API

- [set()](#set)
- [get()](#get)
- [resolve()](#resolve)
- [path()](#path)

### set()

Register a new service

Param | Type | Description
--- | --- | ---
**name** | string | Name of the service
**object** | object / callable | Service object or a resolvable callback function. For [dependency injection](/docs/get-started.md#dependency-injection) pass a closure with your desired services as argument names.
**singleton** | bool | Should object instance be singleton?
**cache** | bool | Should service instance be cached in memory?

#### Return Value

Returns container object instance

#### Example
```js
container.set('myService', {
    'hello': 'world',
    'foo': 'bar'
}, true, false);
```

### get()

Get registered service. Return service instance if already created (singleton) or initialize it if no instance is yet available.

Param | Type | Description
--- | --- | ---
**name** | string | Name of the service

#### Return Value

Requested service object instance or null if no object was found.

#### Example
```js
let service = container.get('myService');
```

### resolve()

This is where the dependency 'magic' happens. This method receives a callable variable, analyze argument names, makes registered service matching those name available inside the callable function and executes it 

Param | Type | Description
--- | --- | ---
**name** | callable | Function needed to be resolved with requested services

#### Return Value

Callback resolved value.

#### Example
```js
let result = container.resolve(function(window, myService) {
    window.alert(myService['hello']); // Alert: 'world'
});
```

### path()

Get value by object path, or set value in object path if value param is passed 

Param | Type | Description
--- | --- | ---
**path** | string | Dot separated nested object path
**value** | mixed | Value to be set in given path **(optional)**

#### Return Value

Value of the requested path or null if no path was found.

#### Example
```js

// Get Path Value
let result = container.path('myService.foo'); // = 'bar'

// Set Path Value
container.path('myService.foo', 'new value');

let result = container.path('myService.foo'); // = 'new value'
```
