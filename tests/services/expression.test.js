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

test('expression parsing', () => {
    expect(function () {
        return expression.getPaths()
    }()).toEqual(['tasks.title', 'tasks.config.theme.background']);
});