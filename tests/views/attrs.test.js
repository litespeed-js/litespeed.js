const app = require('../../dist/litespeed');

document.body.innerHTML = '<input type="text" id="test1" data-ls-attrs="title={{service.title}},class=new" />' + 
    '<input type="text" id="test2" data-ls-attrs="title={{service.author.name|lowercase}},class={{service.author.color}}" />';

const element1 = document.getElementById('test1');
const element2 = document.getElementById('test2');
const view = window.ls.view;
const container = window.ls.container;
const service = {
    'title': 'Hello World',
    'description': 'I am a mock service',
    'author': {
        'name': 'Eldad Fux',
        'color': 'blue',
    }
};

container.set('service', service, true, true);

let instance = container.get('service');

view.render(document.body);

test('basic attr binding 1', () => {
    expect(function () {
        return element1.title;
    }()).toEqual('Hello World');
});

test('basic attr binding 2', () => {
    expect(function () {
        return element1.className;
    }()).toEqual('new');
});

test('basic attr binding with nested property 3 + filter applied', () => {
    expect(function () {
        return element2.title;
    }()).toEqual('eldad fux');
});

test('basic attr binding with nested property 3', () => {
    expect(function () {
        return element2.className;
    }()).toEqual('blue');
});

test('basic binding after service title change', () => {
    expect(function () {
        instance.title = 'New Title'
        return element1.title;
    }()).toEqual('New Title');
});

test('basic binding after service object change 1 + filter applied', () => {
    expect(function () {
        instance.author = {name: 'EF', color: 'pink'}
        return element2.title;
    }()).toEqual('ef');
});

test('basic binding after service object change 2', () => {
    expect(function () {
        return element2.className;
    }()).toEqual('pink');
});