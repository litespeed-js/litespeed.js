require('../../dist/litespeed');

const comp = {
    'selector': 'data-comp',
    'controller': function (element) {
        element.innerHTML = element.getAttribute('data-comp');
    }
};

document.body.innerHTML = '<div data-comp="hello world"></div>';

const view = window.ls.view;

test('adding a new view comp', () => {
    expect(function () {
        view.add(comp);

        return view.stock[comp.selector];
    }()).toEqual(comp);
});

test('rendering of a view comp', () => {
    expect(function () {
        view.render(document.body);

        return document.body.innerHTML;
    }()).toBe('<div>hello world</div>');
});