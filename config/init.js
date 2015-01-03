var init = function(cb) {
  // Add uncaught-exception handler in prod-like environments
  if (geddy.config.environment != 'development') {
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
  // temp, until db is set up
  geddy.entries = []

  geddy.model.adapter = {};
  geddy.model.adapter.Entry = require(process.cwd() + '/lib/model_adapters/entry').Entry;
  cb();
};

exports.init = init;
