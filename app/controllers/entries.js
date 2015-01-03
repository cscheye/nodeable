var Entries = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this
    geddy.model.Entry.all(function(err, entries){
      console.log(entries)
      if (err)
        throw err
      else
        self.respond({
          pamams: params
          , entries: entries
        })
    })
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , opts = {
        id: geddy.string.uuid(10)
        , content: {}
      }
      , entry

    if (params.title) opts.title = params.title
    opts.content[params.topic] = params.body
    entry = geddy.model.Entry.create(opts);

    entry.save(function (err, data) {
      if (err) {
        params.errors = err;
        self.transfer('add');
      }
      else {
        self.redirect({controller: self.name});
      }
    });
  };

  this.show = function (req, resp, params) {
    var self = this
    geddy.model.Entry.load(params.id, function(err, entry){
      if (err) {
        params.errors = err
      }
      self.respond({params: params, entry: entry})
    })
  };

  this.edit = function (req, resp, params) {
    this.respond({params: params});
  };

  this.update = function (req, resp, params) {
    // Save the resource, then display the item page
    this.redirect({controller: this.name, id: params.id});
  };

  this.remove = function (req, resp, params) {
    this.respond({params: params});
  };

};

exports.Entries = Entries;

