# Get Started

The first step to get started with Litespeed.js is to init the framework in your web project layout.

```html
<!DOCTYPE html>
<html>
    <head></head>
    <body data-ls-init>
        <main data-ls-scope="">Loading your router state...</main>

        <script>
            (function (window) {
                "use strict";

                document.addEventListener("DOMContentLoaded", function() {
                    let head      = document.getElementsByTagName('head')[0];
                    let script    = document.createElement('script');
                    script.async  = true;
                    script.src    = 'scripts/litespeed.js';

                    script.onload = function() {

                        window.ls.router // Add some basic routing rules
                            .add('/', {
                                template: '/pages/index.html'
                            })
                            .add('/pages/page-1', {
                                template: '/pages/page-1.html'
                            })
                        ;

                        window.Demo.run(window); // Watch the magic happens
                    };

                    head.appendChild(script);
                });

            }(window));

        </script>
    </body>
</html>
```

This is a basic example that shows how to init a Litespeed.js app and set 3 different views for our main scope with their respective URL's.

## Create a New Service

Services are where you handle your app logic. A service is any Javascript object, whether a native object, object you create or a 3rd party library, we really don't mind.

Any service you register using the [container service](/docs/services/container.md) is automatically available to auto-discovery available using Litespeed dependency injection algorithm.  

### Example

```js
window.Litespeed.container.set('timezone', function () {
        return {
            convert: function (unixTime) {
                var timezoneMinutes = new Date().getTimezoneOffset();
                timezoneMinutes = (timezoneMinutes === 0) ? 0 : -timezoneMinutes;

                // Timezone difference in minutes such as 330 or -360 or 0
                return parseInt(unixTime) + (timezoneMinutes * 60);
            }
        };
    }, true);
```

### APIs & Examples

Service | Description | API & Examples
--- | --- | ---
**container** | Manage service registration, data binding and dependency injection internally. | [API Refs & Examples](/docs/services/container.md)
**cookie** | Manages user cookie, retrieve and set cookies. | [API Refs & Examples](/docs/services/cookie.md)
**expression** | Parse template syntax expressions and execute them as JS code. | [API Refs & Examples](/docs/services/expression.md)
**filter** | Use predefined string filters or add custom filters. | [API Refs & Examples](/docs/services/filter.md)
**http** | Manage HTTP interactions with server side APIs. | [API Refs & Examples](/docs/services/http.md)
**router** | Manage state registration and routing. | [API Refs & Examples](/docs/services/router.md)
**view** | Handles views registration and rendering | [API Refs & Examples](#/docs/services/view.md)

## Create a New View Component

// TODO

### APIs & Examples

Service | Description | API & Examples
--- | --- | ---
**ls-init** | Starts DOM rendering and listen for URL changes. | [API Refs & Examples](/docs/view/init.md)
**ls-scope** | Uses to define the routed element scope. | [API Refs & Examples](/docs/view/scope.md)
**ls-bind** | Binds data between your services to the DOM. | [API Refs & Examples](/docs/views/echo.md)
**ls-attrs** | Binds data between your services to your element attributes. | [API Refs & Examples](/docs/views/echo.md)
**ls-if** | Hides element according to given expression evaluation | [API Refs & Examples](/docs/views/if.md)
**ls-loop** | Iterate over a service or array and renders element for each iteration. | [API Refs & Examples](/docs/views/loop.md)
**ls-template** | Render HTTP remote or inline script template to given element. | [API Refs & Examples](/docs/views/template.md)


## Create a New Filter

// TODO

## Dependency Injection

Litespeed.js support an advanced dependency injection which allows your closures to get other Litespeed.js services available to them as arguments.

To enable service injection, name the services you need as arguments in closures when creating new services or view components.

### Examples

```js
window.Litespeed.conatiner.set('user1', { // Creating our first service
    'name': 'first member',
    'email': 'one@example.com'
}, true, true);

window.Litespeed.conatiner.set('user2', { // Creating our second service
    'name': 'second member',
    'email': 'two@example.com'
}, true, true);

window.Litespeed.conatiner.set('team', function(user1, user2) {
  // Hurray! both user1 and user2 services are magically available for us! 
  return {
      'user1': user1,
      'user2': user2,
  }
}, true, true);

// And the same works with a view controller:

window.Litespeed.conatiner.get('view')
    .add({
        selector: 'data-test',
        repeat: true,
        controller: function(element, user1, user2, document) {
            // Hurray! both element, user1 and user2 and document services are all magically available for us!
        }
    })

``` 