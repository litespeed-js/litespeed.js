require('../../dist/litespeed');

const http = window.ls.container.get('http');

const url = 'http://www.mocky.io/v2/5cbacef831000063004d73f8';

const response = '{"name":"John", "age":30, "car":null}';

test('http get request', () => {
    return http.get(url).then(data => {
        expect(data).toBe(response);
    });
});

test('http post request', () => {
    return http.post(url, {'Content-Type': 'application/json'}, '{}').then(data => {
        expect(data).toBe(response);
    });
});

test('http put request', () => {
    return http.put(url, {'Content-Type': 'application/json'}, '{}').then(data => {
        expect(data).toBe(response);
    });
});

test('http patch request', () => {
    return http.patch(url, {'Content-Type': 'application/json'}, '{}').then(data => {
        expect(data).toBe(response);
    });
});

test('http delete request', () => {
    return http.delete(url).then(data => {
        expect(data).toBe(response);
    });
});