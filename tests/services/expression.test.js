const app = require('../../dist/litespeed');

const tasks = {
    'title': 'Today Tasks',
    'list': [
        'this is task number 1',
        'this is task number 2',
        'this is task number 3',
    ],
    'config': {
        'theme': {
            'background': '#fff',
            'text': '#000',
        }
    }
};

const container = window.ls.container;
const expression = container.get('expression');

container.set('tasks', tasks, true);

test('expression parsing', () => {
    expect(function () {
        return expression.parse('{{tasks.title}} & {{tasks.config.theme.background}}')
    }()).toBe(tasks.title + ' & ' + tasks.config.theme.background);
});

test('expression parsing - get paths', () => {
    expect(function () {
        return expression.getPaths()
    }()).toEqual(['tasks.title', 'tasks.config.theme.background']);
});

test('expression parsing - not found (undefined default)', () => {
    expect(function () {
        return expression.parse('{{not.defined}}', 'undefined')
    }()).toBe('undefined');
});

test('expression parsing - not found (null default)', () => {
    expect(function () {
        return expression.parse('{{not.defined}}', 'null')
    }()).toBe('null');
});

test('expression parsing - not found (with casting)', () => {
    expect(function () {
        return expression.parse('{{tasks.title}}', '', null, null, true)
    }()).toBe(tasks.title);
});

test('expression parsing - customize regex', () => {
    expression.regex = /(--.*?--)/gi;

    expect(function () {
        return expression.parse('--tasks.title--')
    }()).toBe(tasks.title);
});