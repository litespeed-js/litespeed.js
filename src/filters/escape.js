window.ls.container.get('filter').add('escape', $value => {
    if(typeof $value !== 'string') {
        return $value;
    }

    return $value.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/\'/g, '&#39;')
        .replace(/\//g, '&#x2F;')
    ;
});