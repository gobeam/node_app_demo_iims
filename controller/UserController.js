const mongoose = require('mongoose');
const User = mongoose.model('User');


exports.get = async (req, res) => {
try{
		let users = await User.find({});
		res.json({data: users});
	} catch(e) {
		console.log(e);
		res.status(400).json({error: 'Bad request'});
	}
}

exports.store = async (req, res) => {
	try{
		let {firstName, lastName, address, phone, age} = req.body;
		let user = new User();
		user.firstName = firstName;
		user.lastName = lastName;
		user.address = address;
		user.phone = phone;
		user.age = age;
		user.status = true;
		user.createdAt = Date.now();
		await user.save();
		res.json({data: user});
	}catch(e) {
		res.status(400).json({error: 'Bad Request'});
	}
	
}

exports.update = async (req, res) => {
	try{
		let user = await User.findById(req.params.id);
		if(!user){
			return res.status(404).json({error: 'Data not found'});
		}
		let {firstName, lastName, address, phone, age} = req.body;
		user.firstName = firstName;
		user.lastName = lastName;
		user.address = address;
		user.phone = phone;
		user.age = age;
		await user.save();
		res.json({data: user})
	}catch(e) {
		res.status(400).json({error: 'Bad Request'});
	}
}

exports.view = async(req, res) => {
	try {
		let user = await User.findById(req.params.id);
		res.json({data: user})
	} catch{
		res.status(400).json({error: 'Bad Request'});
	}
	
}

exports.destroy = async (req, res) => {
	try{
		let user = await User.findById(req.params.id);
		if(user) {
		 await user.remove();
			// await User.remove({_id: req.params.id});
		}
		res.status(204).json({});
	} catch {
		res.status(400).json({error: 'Bad Request'});
	}
}