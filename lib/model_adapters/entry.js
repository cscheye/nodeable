var _ = require('lodash')
  , Entry


Entry = function(){
  this.save = function save(entry, opts, cb){
    if (typeof cb !== 'function')
      cb = function(){}

    var cleanEntry = _.pick(entry, ['id', 'title', 'content'])

    entry = geddy.model.Entry.create(cleanEntry)

    if (!entry.isValid())
      return cb(entry.errors)

    geddy.db.entries.findOne({id: entry.id}, function findEntryById(err, doc){
      if (err) return cb(err)

      if (doc){
        geddy.db.entries.update({id: entry.id}, cleanEntry, function(err, entry){
          return cb(err, entry)
        })
      }
      else {
        geddy.db.entries.save(cleanEntry, function(err, entry){
          return cb(err, entry)
        })
      }
    })

  }

  this.all = function all(cb){
    geddy.db.entries.find({}, function(err, docs){
      if (err) return cb(err)
      return _.map(docs, function(doc){
        geddy.model.Entry.create(doc)
      })
    })
  }

  this.load = function load(id, cb){
    geddy.db.entries.findOne({id: id}, function(err, doc){
      if (err) return cb(err)
      return cb(null, geddy.model.Entry.create(doc))
    })
  }
}

module.exports.Entry = new Entry()
