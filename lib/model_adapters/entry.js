var Entry = function(){
  this.save = function save(entry, opts, cb){
    if (typeof cb !== 'function')
      cb = function(){}

    entry.saved = true
    geddy.entries.push(entry)
    return cb(null, entry)
  }

  this.all = function all(cb){
    cb(null, geddy.entries)
  }

  this.load = function load(id, cb){
    for (var i; i < geddy.entries; i++){
      if (geddy.entries[i].id === id)
        return cb(null, geddy.entries[i])
    }
    cb(new Error('Cannot find entry'))
  }
}
module.exports.Entry = new Entry()
