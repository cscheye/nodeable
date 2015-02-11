var express = require('express')
  , router = express.Router()
  , _ = require('lodash')
  , User = require('../models/user.js')

/* GET users listing. */
router.get('/', function usersGet(req, res) {
  User.find({}, function(err, users){
    res.send(users)
  })
});

/* GET user model */
router.get('/:id', function userGet(req, res){
  User.findOne({_id: req.params.id}, function(err, user){
    // TODO error handling
    if (!user){
      res.status(500)
      res.send('500 nothing found')
    }
    else
      res.send(user)
    })
})

/* POST new user model */
router.post('/', function usersPost(req, res){
  var user = new User(req.body)
  user.save(function userSave(err, user){
    if (err) {
      console.error(err)
      res.send('error - could not save user')
    }
    else
      res.send(user)
  })
})

/* PUT existing user model */
router.put('/:id', function userPut(req, res){
  User.findOne({_id: req.params.id}, function userFindPut(err, user){
      if (err) {
        console.error(err)
        res.send('error - could not find user')
      }
      else {
        _.extend(user, req.body)

        user.save(function(err){
          if (err) {
            console.error(err)
            res.send('error - could not save user')
          }
          else {
            res.send(user)
          }
        })
      }
    })
})

/* DELETE existing user model */
router.delete('/:id', function userPut(req, res){
  User.remove({_id: req.params.id}, function userDelete(err, user){
      if (err) {
        console.error(err)
        res.send('error - could not find user')
      }
      else {
        res.send(user)
      }
    })
})

module.exports = router;
