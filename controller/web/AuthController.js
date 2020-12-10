const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');

exports.registerView = (req, res) => {
	res.render('system/auth/register');
};

exports.loginView = (req, res) => {
	res.render('system/auth/login');
};
exports.checkIfLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()) {
		req.flash('alerts', {type:'warning', message: "You're already logged in"})
		res.redirect('/product')
	}
	next();
};

exports.isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()) {
		next();
		return;
	}
	req.flash('alerts', {type:'danger', message: "You must log in to continue"});
	res.redirect('/login');
};

exports.login = (req, res, next) => {
passport.authenticate('local', (err, user, info) => {
	if(err) {
		req.flash('alerts', {type: 'danger', message: 'Incorrect username/password'});
		return res.redirect('/login');
	}
	if(!user) {
		req.flash('alerts', {type: 'danger', message: 'Incorrect username/password'});
		return res.redirect('/login');
	}
	req.logIn(user,(err) => {
		if(err) {
			req.flash('alerts', {type: 'danger', message: 'Incorrect username/password'});
			return res.redirect('/login');
		}
		return res.redirect('/product');
	})
})(req,res,next)
};

exports.logout = (req, res) => {
	req.logout();
	req.flash('alerts',{type: 'success', message: 'Successfully Logout!'});
	res.redirect('/login');
};

exports.register = async (req, res) => {
	// return res.json(req.body);
	let {email, firstName, lastName, address, phone, age, password} = req.body;
	try{
		let err = await User.register({
			email, firstName, lastName, address, phone, age
		},password);
		req.flash('alerts', {
			type: 'success',
			message: 'User registration successful!'
		});
		res.redirect('/login');
	}catch (e) {
		console.log(e);
		req.flash('alerts', {
			type: 'danger',
			message: 'Error during registration !'
		});
		res.redirect('/register');
	}
	

};
