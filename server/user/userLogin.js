var LocalStrategy   = require('passport-local').Strategy,
    bCrypt = require('bcrypt-nodejs'),
    mongo = require('../mongo'),
    db = mongo.getDb();


module.exports = function(passport){
	var isValidPassword = function(user, password){
  		return bCrypt.compareSync(password, user.password);
	};
	
	passport.use(new LocalStrategy({
		usernameField: 'email',
    	passwordField: 'password',
	    passReqToCallback : true
	  }, function(req, username, password, done) { 
		    db.collection("user").findOne({ 'email' :  username }, 
		      function(err, user) {
		        if (err)
		          return done(err);
		        if (!user){
		          return done(null, false,{field: 'email', message: 'Email not found'});
		        } 
		        if (!isValidPassword(user, password)){
		          return done(null, false, {field: 'password', message: 'Incorrect Password'});
		        }
		        return done(null, user);
		      }
		    );
		}
	));
}