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

// TODO

## Creating a New View Component

// TODO

## Creating a New Filter

// TODO