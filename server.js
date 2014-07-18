var http = require('http')
var util = require('util')
var router = require('./router')

router.get('/', 'test#index')
router.get('/hello', 'test#hello')

var handleError = function (request, response) {
  response.writeHead(404, {"Content-Type": "text/plain"});
  response.end("Not Found");
}

var server = http.createServer(function (request, response) {
  // response.end(util.inspect(request));

  var fun = router.resolve(request) || handleError;
  fun(request, response);
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);
