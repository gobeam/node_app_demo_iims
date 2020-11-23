const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

// query all stored users
router.get('/user', async (req, resp) => {
	try{
		let users = await User.find({});
		resp.json({data: users});
	} catch(e) {
		console.log(e);
		resp.status(400).json({error: 'Bad request'});
	}
	
});

// store a blog
router.post('/user', async (req, res) => {
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
		resp.status(400).json({error: 'Bad Request'});
	}
	
});

// Update a user by id
router.put('/user/:id', async (req, res) => {
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
		resp.status(400).json({error: 'Bad Request'});
	}
});

// query a user through given id
router.get('/user/:id', async(req, res) => {
	try {
		let user = await User.findById(req.params.id);
		res.json({data: user})
	} catch{
		resp.status(400).json({error: 'Bad Request'});
	}
	
})

// delete a user by given id
router.delete('/user/:id', async (req, res) => {
	try{
		let user = await User.findById(req.params.id);
		if(user) {
		 await user.remove();
			// await User.remove({_id: req.params.id});
		}
		res.status(204).json({});
	} catch {
		resp.status(400).json({error: 'Bad Request'});
	}
	
	
})


module.exports = router;