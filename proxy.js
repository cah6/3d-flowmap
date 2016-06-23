var http = require('http');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
var static = require('node-static');
var url = require('url');

var file = new static.Server('.', { cache: 7200});

console.log("> node-static is listening on http://127.0.0.1:3000");
proxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader('Authorization', 'Basic ' + new Buffer("e2eadmin@customer1:fit-yics-oi").toString('base64'));
});

http.createServer(function(req, res) {
    var cache = [];
    var reqStr = JSON.stringify(req, function(key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return;
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    });
    cache = null;

    var url_parts = url.parse(req.url);

    console.log("request: " + reqStr);
    console.log("request.url: " + url_parts.pathname);
    if (url_parts.pathname.indexOf("/controller") == 0) {
        proxy.web(req, res, { target: 'http://ec2-54-213-152-245.us-west-2.compute.amazonaws.com:8090' });
    } else {
        file.serve(req, res, function (err, response) {
            if (err) { // An error as occured
                console.error("> Error serving " + req.url + " - " + err.message);
                res.writeHead(err.status, err.headers);
                res.end();
            } else { // The file was served successfully
                console.log("> " + req.url + " - " + response.message);
            }
        });
    }
}).listen(3000);
