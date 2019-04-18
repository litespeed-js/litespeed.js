// Register all core services
window.ls.container
    .set('window', window, true, false, false)
    .set('document', window.document, true, false, false)
    .set('element', window.document, true, false, false)
;

window.ls.app = function(version) {
    return {
        run: function(window) {
            try {
                window.ls.container.get('http').addGlobalParam('version', version);

                // Trigger reclusive app rendering
                this.view.render(window.document);
            }
            catch (error) {
                let handler = window.ls.container.resolve(this.error);
                handler(error);
            }
        },
        error: function() {return function(error) {console.error('error', error.message, error.stack, error.toString());}},
        container: window.ls.container,
        view: window.ls.container.get('view')
    }
};