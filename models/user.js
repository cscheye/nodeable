var mongoose = require('mongoose')
, userSchema
, User

userSchema = mongoose.Schema({
    name: String
  , age: Number
  , methods: {
  }
})

userSchema.methods.growOlder = function growOlder () {
  this.age += 1
}

User = mongoose.model('User', userSchema)

module.exports = User
