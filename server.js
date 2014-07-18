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
  var fun = router.resolve(request) || handleError;
  fun(request, response);
});

var port = Number(process.env.PORT || 5000);
server.listen(port);
