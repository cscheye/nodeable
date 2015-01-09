var mongo = require('mongodb-wrapper')
  , init

init = function init(cb) {
  geddy.db = mongo.db('localhost', 27017, 'nodeable')
  geddy.db.collection('entries')

  // Add uncaught-exception handler in prod-like environments
  if (geddy.config.environment !== 'development') {
    process.addListener('uncaughtException', function (err) {
      var msg = err.message;
      if (err.stack) {
        msg += '\n' + err.stack;
      }
      if (!msg) {
        msg = JSON.stringify(err);
      }
      geddy.log.error(msg);
    });
  }

  geddy.model.adapter = {};
  geddy.model.adapter.Entry = require(process.cwd() + '/lib/model_adapters/entry').Entry;
  cb();
};

exports.init = init;
