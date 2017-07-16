var express = require('express'),
    router = express.Router(),
    bCrypt = require('bcrypt-nodejs'),
    registerUser = require('../user/userSignup'),
    mongo = require('../mongo'),
    jsonwebtoken =require("jsonwebtoken"),
    ObjectId = mongo.getMongoId(),
    db = mongo.getDb(),
    jwt = require('express-jwt'),
    auth  = jwt({
      secret: 'MY_SECRET',
      userProperty: 'payload'
    });

var generateJwt = function(user) {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jsonwebtoken.sign({
    _id: user._id,
    email: user.email,
    fName: user.fName,
    lName: user.lName,
    name: user.fName + ' ' + user.lName,
    avatar: user.avatar,
    color: user.color,
    exp: parseInt(expiry.getTime() / 1000)
  }, "MY_SECRET");
};

var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

module.exports = function(passport){ 
  router.post('/api/login', function(req, res) {
      passport.authenticate('local', function(err, user, info){
          var token;
          if (err) {
            res.status(404).json(err);
            return;
          }
          if(user){
            token = generateJwt(user);
            res.status(200);
            res.json({
              "token" : token
            });
          } else {
            res.status(200).json(info);
          }
    })(req, res);
  });
 
  router.post('/api/signup', function(req, res) {
    registerUser(req, res)
  });

  router.get('/api/home' , function(req, res){
    res.send('home page');
  });

  router.get('/api/signout', function(req, res) {
    req.logout();
    res.send({message: 'Logged out successfully'});
  });

  router.get('/api/todos', auth, function(req, res) {
      db.collection("todos").find({cBy: req.payload._id}).toArray(function(err, todos) {
          if (err)
              res.send(err);
          res.json(todos);
      });
    });

  router.post('/api/todos', function(req, res) {
      var todo = req.body.todo;
      db.collection("todos").insert(todo, function(err, todo) {
          if (err)
              res.send(err);
          res.send({message: 'Task added successfully'});
      });

  });

  router.post('/api/updateTodo', function(req, res) {
      var updateObj = {
        completed: true
      };
      db.collection("todos").update({_id : ObjectId(req.body.todo._id)}, {$set: updateObj},function(err, todo) {
        if(err) {
          throw err;
        }
        res.send({"message" : 'Task updated successfully'})    
      });
  });

  router.post('/api/removeTodo', function(req, res) {
      db.collection("todos").remove({_id: ObjectId(req.body._id)}, function(err) {
          if (err)
              res.send(err);
          res.send({message : 'Task deleted successfully'});
      });
  });

  router.get('/api/profile', auth, function(req, res) {
      db.collection("user").findOne({_id : ObjectId(req.payload._id)}, {fields: {password: 0}}, 
            function(err, user) {
                if (err)
                    res.send(err);
                res.send(user);
            }
      );
  });

  router.post('/api/profile', auth, function(req, res) {
      var updateObj = {};
      updateObj['fName'] = req.body.fName;
      updateObj['lName'] = req.body.lName;
      updateObj['email'] = req.body.email;
      updateObj['avatar'] = updateObj.fName[0].toUpperCase() + (updateObj.lName[0] && updateObj.lName[0].toUpperCase() || '');
      if(req.body.password && req.body.password === req.body.cPassword) {
        updateObj['password'] = createHash(req.body.password);
      }
      db.collection("user").findOneAndUpdate({_id : ObjectId(req.payload._id)}, {
        $set: updateObj
      }, function(err, user) {
            if (err)
                res.send(err);
            res.send({"message" : 'Profile updated successfully'});
          }
      );
  });

  return router;
};