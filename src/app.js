var app = function() {
    return {
        run: function(window) {
            try {
                // Register all core services
                this.container
                    .register('window', window, true)
                    .register('view', view, true)
                    .register('router', router, true)
                    .register('http', http, true)
                ;

                // Trigger reclusive app rendering
                this.view.render(window.document, container);
            }
            catch (error) {
                //TODO add custom error handling
                console.error('error', error.message, error.stack, error.toString());
            }
        }
    }
};