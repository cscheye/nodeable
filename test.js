var fs = require('fs')

exports.index = function(request, response){
  render('templates/index.html', response);
};

exports.hello = function(request, response) {
  render('templates/hello.html', response);
};

var render = function (filename, response) {
  fs.readFile(filename, function(error, html){
    if(!error){
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(html)
    }
    response.end();
  })
}