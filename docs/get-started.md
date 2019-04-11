# Get Started

The first step to get started with Litespeed.js is to init the framework in your web project layout.

```html
<!DOCTYPE html>
<html>
    <head></head>
    <body data-ls-init>
        <main data-ls-scope="">Loading...</main>

        <script>
            (function (window) {
                "use strict";

                document.addEventListener("DOMContentLoaded", function() {
                    let head      = document.getElementsByTagName('head')[0];
                    let script    = document.createElement('script');
                    script.type   = 'text/javascript';
                    script.async  = true;
                    script.src    = 'scripts/litespeed.js';

                    script.onload = function() {
                        window.Demo = app('v1.0.0'); // Init app and set your own cache buster value

                        let state   = window.Demo.container.get('state');

                        state // Add some basic routing rules
                            .add('/', {
                                template: '/pages/index.html'
                            })
                            .add('/pages/test-1', {
                                template: '/pages/test-1.html'
                            })
                            .add('/pages/test-2', {
                                template: '/pages/test-2.html'
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

## Register a New Service

Services are where you handle your app logic. A service is any Javascript object, whether a native object, object you create or a 3rd party library, we really don't mind.

Any service you register using the [container service](/docs/services/container.md) is automatically available to auto-discovery available using Litespeed dependency injection algorithm.  

## Creating a New View Component

// TODO

## Creating a New Filter

// TODO

## Dependency Injection

Litespeed.js support an advanced dependency injection which allows your callback to get other Litespeed.js services available as argument.

To enable service injection, name the services you need as arguments in closures when creating new services or view components.

```js
conatiner.set('user1', { // Creating our first service
    'name': 'first member',
    'email': 'one@example.com'
}, true, true);

conatiner.set('user2', { // Creating our second service
    'name': 'second member',
    'email': 'two@example.com'
}, true, true);

conatiner.set('team', function(user1, user2) {
  // Hurray! both user1 and user2 services are magically available for us! 
  return {
      'user1': user1,
      'user2': user2,
  }
}, true, true);

``` 