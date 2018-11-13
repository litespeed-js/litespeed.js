# Container

The container service allows to manage dependency injection across the application, have easy access to object or services and lazy-load, singleton or cache the creation of new service instances.

## API

### set()

Register a new service

Param | Type | Description
--- | --- | ---
**name** | string | Name of the service
**object** | object / callable | Service object or a resolvable callback function
**singleton** | bool | Should object instance be singleton?
**cache** | bool | Should service instance be cached in memory?

#### Example
```js
app.container.set('service', {
    'hello': 'world',
    'foo': 'bar'
}, true, false);
```
