
var view = require('view');

view.add({
    name: 'ls-eval',
    selector: 'data-ls-eval',
    template: false,
    controller: function(element, container) {
        var statement   = element.dataset['lsEval'];
alert(2);
        eval(statement);
    }
});