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

test('setting a new service', () => {
    expect(function () {
        container.set('tasks', tasks, true);

        return container.get('tasks');
    }()).toEqual(tasks);
});

test('getting a service', () => {
    expect(function () {
        return container.get('tasks');
    }()).toEqual(tasks);
});

test('getting the title path from a service', () => {
    expect(function () {
        return container.path('tasks.title');
    }()).toBe('Today Tasks');
});

test('getting the list path from a service', () => {
    expect(function () {
        return container.path('tasks.list');
    }()).toEqual(tasks.list);
});

test('getting nested path from a service', () => {
    expect(function () {
        return container.path('tasks.config.theme.text');
    }()).toBe('#000');
});