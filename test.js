exports.text = "hello world...?";
exports.index = function(request, response){
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("no guac?")
};

exports.hello = function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("hello!")
};