var http    = require('http')
    //app     = require('../src/app.js')
;

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(__dirname + req.url + 'Hello World 2\n');
}).listen(1337, '127.0.0.1');

console.info('Server running at http://127.0.0.1:1337/');