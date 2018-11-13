container.get('view').add({
    selector: 'data-ls-options',
    repeat: true,
    controller: function(element, document, expression) {
        var options = expression.parse(element.dataset['lsOptions'] || '{}');
        var key = element.dataset['key'] || null;
        var label = element.dataset['label'] || null;
        var pattern = element.dataset['pattern'] || '{{value}}';
        var placeholder = expression.parse(element.dataset['placeholder'] || '');
        var value = (element.selectedIndex > -1) ? element.options[element.selectedIndex].value : null;

        element.innerHTML = '';

        if (placeholder) {
            var child = document.createElement('option');
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
                var child = document.createElement('option');
                child.value = (key) ? pattern.replace('{{value}}', obj[key]) : JSON.stringify(obj);
                child.innerText = (label) ? obj[label] : JSON.stringify(obj);
                child.selected = (child.value === value);
                element.appendChild(child);
                element.disabled = false;
            });

            return;
        }

        if (typeof options === 'object') {
            Object.keys(options).map(function (x, y) {
                var child = document.createElement('option');
                child.value = (key) ? pattern.replace('{{value}}', options[x]) : x;
                child.innerText = (label) ? options[label] : options[x];
                child.selected = (child.value === value);
                element.appendChild(child);
                element.disabled = false;
            });
        }
    }
});