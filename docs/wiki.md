# Litespeed.js WIKI

/*jslint browser: true*/

## Architecture

* **app.js** - Main application file, this is the application starting point
* services/ - Services directory
    * **container.js**
    * **http.js**
    * **router.js**
    * **view.js**
* views/ - View directory
    * **app.js** - Main scope, this view is responsible to trigger all other views. Usually placed very high in the DOM.
    * **bind.js** - Enables 2 way binding on form elements.
    * **loop.js** - Iterates over an bounded array or object.
    * **placeholder.js** Prints bounded var value to element.
    * **submit.js** Triggers a new state and forward form parameters to it.

## API**

components
    - data-ls-app -done
    - data-ls-bind -done
    - data-ls-show -e
    - data-ls-hide -e
    - data-ls-click -e
    - data-ls-loop -h
    - data-ls-submit -h
    - data-ls-switch -h
    - data-ls-attr (set attr watch statement)

## Performance

Cache
Single observation point
Memory monitor
Garbage collector

## Concepts

* SimplicityX100
* Uses only HTML for markup - no template engine!
* Relay on native API as much as possible - Vanilla we are!
* Actions over States
    The name states more implement on UI states. but owr application has more then that. Each application hold many actions and functionality. states are the story of your app.

Features to modules:

 * Binding - view.js + native observer
 * States - router.js
 * Components - view.js