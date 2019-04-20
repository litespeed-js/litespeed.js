const app = require('../../dist/litespeed');

const filter = window.ls.filter;

const value = 'example';

test('add new custom filter', () => {
    expect(function () {
        filter.add('prefix', function ($value) {
            return 'prefix ' + $value
        });

        return filter.apply('prefix', value)
    }()).toBe('prefix ' + value);
});

test('uppercase filter', () => {
    expect(function () {
        return filter.apply('uppercase', 'hello world');
    }()).toBe('HELLO WORLD');
});

test('lowercase filter', () => {
    expect(function () {
        return filter.apply('lowercase', 'HELLO WORLD');
    }()).toBe('hello world');
});
