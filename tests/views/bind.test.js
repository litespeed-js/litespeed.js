require('../../dist/litespeed');

document.body.innerHTML = '<input type="text" id="test1" data-ls-bind="{{service.title}}" />' + 
    '<input type="text" id="test2" data-ls-bind="{{service.author.name}}" />';

const element1 = document.getElementById('test1');
const element2 = document.getElementById('test2');
const view = window.ls.view;
const container = window.ls.container;
const service = {
    'title': 'Hello World',
    'description': 'I am a mock service',
    'author': {
        'name': 'Eldad Fux'
    }
};

container.set('service', service, true, true);

let instance = container.get('service');

view.render(document.body);

test('basic binding', () => {
    expect(function () {
        return element1.value;
    }()).toEqual('Hello World');
});

test('basic binding after service title change', () => {
    expect(function () {
        instance.title = 'New Title'
        return element1.value;
    }()).toEqual('New Title');
});

test('basic binding after service object change', () => {
    expect(function () {
        instance.author = {name: 'EF'}
        return element2.value;
    }()).toEqual('EF');
});