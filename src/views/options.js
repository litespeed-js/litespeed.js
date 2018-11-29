container.get('view').add({
    selector: 'data-ls-options',
    repeat: true,
    controller: function(element, document, expression, container) {
        let options = expression.parse(element.dataset['lsOptions'] || '{}');
        let key = element.dataset['key'] || null;
        let label = element.dataset['label'] || null;
        let placeholder = expression.parse(element.dataset['placeholder'] || '');
        let value = (element.selectedIndex > -1) ? element.options[element.selectedIndex].value : null;

        element.innerHTML = '';

        if (placeholder) {
            let child = document.createElement('option');
            child.value = '';
            child.innerText = placeholder;
            element.appendChild(child);
        }

        try {
            options = JSON.parse(options);
        }
        catch (error) {
            options = [];
        }

        element.disabled = true;

        if (Array.isArray(options)) {
            options.map(function (obj) {
                let child = document.createElement('option');

                container.set('option', obj, false, false);

                child.value = (key) ? expression.parse(key) : JSON.stringify(obj);
                child.innerText = (label) ? expression.parse(label) : JSON.stringify(obj);
                child.selected = (child.value === value);

                element.appendChild(child);
                element.disabled = false;
            });

            return;
        }

        if (typeof options === 'object') {
            Object.keys(options).map(function (x) {
                let child = document.createElement('option');

                container.set('option', options[x], false, false);

                child.value = (key) ? expression.parse(key) : JSON.stringify(options[x]);
                child.innerText = (label) ? expression.parse(label) : JSON.stringify(options[x]);
                child.selected = (child.value === value);
                element.appendChild(child);
                element.disabled = false;
            });
        }
    }
});