var assert = require('assert')
  , tests
  , Entry = geddy.model.Entry;

tests = {

  'after': function (next) {
    // cleanup DB
    Entry.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var entry = Entry.create({});
    entry.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
