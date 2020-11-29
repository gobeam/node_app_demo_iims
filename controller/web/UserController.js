const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.index = async (req, res) => {
	let users = await User.find({});
	res.render('system/pages',{users});
}