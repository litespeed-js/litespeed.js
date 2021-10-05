require('../../dist/litespeed');

const container = window.ls.container;
const cookie = container.get('cookie');

test('set/get cookie', () => {
    expect(function () {
        cookie.set('key', 'value', 100);

        return cookie.get('key');
    }()).toBe('value');
});