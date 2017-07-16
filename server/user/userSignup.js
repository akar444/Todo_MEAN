var bCrypt = require('bcrypt-nodejs'),
    mongo = require('../mongo'),
    db = mongo.getDb();

module.exports = function(req, res){
	var createHash = function(password){
 		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};
    findOrCreateUser = function(){
    	var newUser,
    		color = ['red','pink','purple','indigo','blue','green','orange','brown','gray'];
        db.collection("user").findOne({'email':req.body.email},function(err, user) {
	        if (err){
	          console.log('Error in SignUp: '+err);
	          return res.status(400).send({message: 'Something went wrong'});
	        }
	        if (user) {
	          req.flash('message','User Already Exists');
	          return res.status(409).send({message: 'User Already Exists'});
	        } else {
	          newUser = {};
	          newUser.email = req.body.email;
	          newUser.password = createHash(req.body.password);
	          newUser.fName = req.body.fName;
	          newUser.lName = req.body.lName;
	          newUser.avatar = newUser.fName[0].toUpperCase() + (newUser.lName[0] && newUser.lName[0].toUpperCase() || '');
              newUser.color = color[Math.floor(Math.random()*color.length)];
	          db.collection("user").insert(newUser, function(err) {
	            if (err){
	              console.log('Error in Saving user: '+err);  
	              throw err;  
	            }
	            return res.status(200).send({message: 'User Registration succesful'});
	          });
	        }
        });
    };
	findOrCreateUser();
};