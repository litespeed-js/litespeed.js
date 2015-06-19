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
    - data-ls-bind -done
    - data-ls-show -e
    - data-ls-hide -e
    - data-ls-scope *
    - data-ls-loop -h
    - data-ls-submit -h
    - data-ls-click -e
    - data-ls-switch -h
    - data-ls-attr (set attr watch statement)

router

ioc

Flow
---

init
match
render -> load scope comp -> load sub scopes

Performance
---
Cache
Single observation point
Memory monitor
Garbage collector

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
container.js
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

