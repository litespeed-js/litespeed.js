<p>
    <img height="45" src="images/litespeed-js.png" alt="Logo">
</p>

[![npm version](https://badge.fury.io/js/litespeed.js.svg)](https://badge.fury.io/js/litespeed.js)

A simple javascript framework to build simple web applications. Litespeed is dependency free, **easy to learn** framework which gives you all tools needed to build a modern, fast and single page web application. 

Litespeed is build using an [MVVM](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel) architecture design, with dependency injection service to provide easy access and dependency management between views and services.

Litespeed.js makes very good use of both browser memory management, garbage collection and rendering to maximize application performance.

- [Getting Started](#getting-started)
- [Services](#services)
- [Views](#views)
- [Contributing](#contributing)
- [Copyright and license](#copyright-and-license)

## Getting Started

Install with [NPM](https://www.npmjs.com/):

```bash
npm install litespeed.js
```

Install with CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/litespeed.js"></script>
```

As of version 0.2.* litespeed.js weights only 6.3kb (minified and compressed)

## Docs

* [Getting Started](/docs/get-started.md)

### Services

Service | Description | API & Examples
--- | --- | ---
**container** | Manage service registration and dependency injection internally. | [API Refs & Examples](/docs/services/container.md)
**cookie** | Manages user cookie, retrive and set cookies. | [API Refs & Examples](/docs/services/cookie.md)
**expression** | Parse template syntax expressions and execute them as JS code. | [API Refs & Examples](/docs/services/expression.md)
**filter** | Use predefined string filters or add custom filters. | [API Refs & Examples](/docs/services/filter.md)
**form** | Parse form elements to JSON data. | [API Refs & Examples](#docs)
**http** | Manage HTTP interactions with server side APIs. | [API Refs & Examples](/docs/services/http.md)
**state** | Manage state registration and routing. | [API Refs & Examples](/docs/services/state.md)
**view** | Handles views registration and rendering | [API Refs & Examples](#/docs/services/view.md)

### Views

TODO

## Contributing

All code contributions - including those of people having commit access - must go through a pull request and approved by a core developer before being merged. This is to ensure proper review of all the code.

Fork the project, create a feature branch, and send us a pull request.

## Copyright and license

The MIT License (MIT) http://www.opensource.org/licenses/mit-license.php
