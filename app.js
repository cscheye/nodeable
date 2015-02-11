var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var mongoose = require('mongoose')

var app

mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.once('open', function(){
  console.log('opened')
  app = express();

  var server = app.listen(3000, function(){
    var host = server.address().address
    var port = server.address().port

    console.log('Listening at http://%s:%s', host, port)
  })

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(favicon());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/', routes);
  app.use('/users', users);

  /// catch 404 and forward to error handler
  app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });

  /// error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development' || app.get('env') === 'local') {
      app.use(function(err, req, res, next) {
          res.status(err.status || 500);
          res.render('error', {
              message: err.message,
              error: err
          });
      });
  }

  if (app.get('env') === 'local') {
  }


  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: {}
      });
  });
})
try{
  mongoose.connect('mongodb://localhost:27017/nodeable-test')
}
catch (e){
  console.error(e)
}


module.exports = app;
