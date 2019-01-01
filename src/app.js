// Register all core services
container
    .set('window', window, true)
    .set('document', window.document, true)
    .set('element', window.document, true)
;

var app = function(version) {
    return {
        run: function(window) {
            try {
                container.get('http').addGlobalParam('version', version);

                // Trigger reclusive app rendering
                this.view.render(window.document);
            }
            catch (error) {
                var handler = container.resolve(this.error);
                handler(error);
            }
        },
        error: function() {return function(error) {console.error('error', error.message, error.stack, error.toString());}},
        container: container,
        view: container.get('view')
    }
};