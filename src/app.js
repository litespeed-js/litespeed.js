window.ls = window.ls || {};

// Register all core services
window.ls.container
    .set('window', window, true, false)
    .set('document', window.document, true, false)
    .set('element', window.document, true, false)
;

window.ls.run = function (window) {
    try {
        this.view.render(window.document); // Start DOM rendering
    }
    catch (error) {
        let handler = window.ls.container.resolve(this.error);
        handler(error);
    }
};

window.ls.error = () => {
    return error => {
        console.error('ls-error', error.message, error.stack, error.toString());
    }
};

window.ls.router = window.ls.container.get('router');

window.ls.view = window.ls.container.get('view');

window.ls.filter = window.ls.container.get('filter');