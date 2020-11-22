const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = mongoose.model('User');


const app = express();
const port = 8000;
let blogs = []; //{id:1, title: ''}


app.use(bodyParser.json());


// query all stored users
app.get('/user', async (req, resp) => {
	let users = await User.find({});
	resp.json({data: users});
});

// store a blog
app.post('/user', async (req, res) => {
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
});

// Update a blog by id
app.put('/blog/:id',(req, res) => {

	let blog = blogs.filter((value, index) => {
		return value.id === parseInt(req.params.id)
	});
	if(!blog[0]){
		return res.status(404).json({error: 'Data not found'});
	}
	let title = req.body.title;
	blogs.forEach((value, index) => {
		if(value.id === parseInt(req.params.id)){
			blogs[index].title = title;
		}
	})
	res.json({id: req.params.id, title:title});
});

// query a blog through given id
app.get('/blog/:id', (req, res) => {
	let data = blogs.filter((value) => value.id === parseInt(req.params.id));
	if(!data[0]){
		return res.status(404).json({error: 'Data not found'});
	}
	res.json(data[0]);
})

// delete a blog by given id
app.delete('/blog/:id', (req, res) => {
	let blog = blogs.filter((value, index) => {
		return value.id === parseInt(req.params.id)
	});
	if(!blog[0]){
		return res.status(404).json({error: 'Data not found'});
	}
	let deleteIndex;
	blogs.forEach((value, index) => {
		if(value.id === parseInt(req.params.id)){
			deleteIndex = index;
		}
	})
	blogs.splice(deleteIndex, 1);
	res.status(204).json({});
})

app.listen(port, () => {
	console.log(`Application is running on port: ${port}`);
})

module.exports =app