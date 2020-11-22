const express = require('express');
const bodyParser = require('body-parser');


const app = express();

let blogs = []; //{id:1, title: ''}


app.use(bodyParser.json());


// query all stored blogs
app.get('/blog',(req, resp) => {
	resp.json(blogs);
});

// store a blog
app.post('/blog',(req, res) => {
	// let {title} = req.body;
	let title = req.body.title;
	let data = {
		id: blogs.length + 1,
		title: title
	}
	blogs.push(data)
	res.json(data);
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



module.exports =app