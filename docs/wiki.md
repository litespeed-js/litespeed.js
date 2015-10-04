# Litespeed.js WIKI

## Concepts

* Simplicity is most important
* Use only HTML for markup - no template engines!
* Relay on native API as much as possible - Vanilla we are!
* Actions over just states

FIXME:
The name states is to related with UI states, Our application has more then that.
Each application hold many actions and functions over just states.
Actions are the story of our app.
Action can represent both states and functionality.

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

## Performance

Cache
Single observation point
Memory monitor
Garbage collector