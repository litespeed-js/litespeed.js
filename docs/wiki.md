# Litespeed.js WIKI

/*jslint browser: true*/

API
---

controller (action)

models

services
    - HTTP *
    -

components
    - data-ls-bind
    - data-ls-bind-reverse
    - data-ls-show
    - data-ls-hide
    - data-ls-scope *
    - data-ls-loop

router

ioc

Flow
---

init
match
render -> load scope comp -> load sub scopes


Concepts to think about
---

SimplicityX100
Templates Engine (Based on HTML only?)
Relay on native API as much as possible
Works on both back and front?

Features to modules:

 * MVC - example.js + request.js + response.js
 * Binding - view.js + native observer
 * States - router.js
 * Services - service.js
 * Components - view.js

Modules:

example.js
request.js
response.js
router.js
services.js
view.js

Expose: (example from sizzle)

 // EXPOSE
 if ( typeof define === "function" && define.amd ) {
 define(function() { return Sizzle; });
 // Sizzle requires that there be a global window in Common-JS like environments
 } else if ( typeof module !== "undefined" && module.exports ) {
 module.exports = Sizzle;
 } else {
 window.Sizzle = Sizzle;
 }
 // EXPOSE

 })( window );

