const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.registerView = (req, res) => {
	res.render('system/auth/register');
};

exports.register = async (req, res) => {
	let {email, firstName, lastName, address, phone, age, password} = req.body;
	let user = new User();
	user.email = email;
	user.firstName = firstName;
	user.lastName = lastName;
	user.address = address;
	user.phone = phone;
	user.age = age;
	user.status = true;
	user.createdAt = Date.now();
	await User.register(user,password);
	req.flash('alerts', {
		type: 'success',
		message: 'User registration successful!'
	});
	res.render('/login');

};
