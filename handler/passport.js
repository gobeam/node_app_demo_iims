const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// passport.serializeUser(function(user,cb){
// cb(null, user.id)
// });
//
// passport.deserializeUser(async function(id, cb) {
// 	let user = await User.findById(id);
// 	if(user) {
// 		cb(null,user);
// 	}
// 	cb(null);
// });

