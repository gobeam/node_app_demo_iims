const express = require('express');

const app = express();
const port = 8000;

let blogs = [{
	id: 1,
	title: 'hello'
},
{
	id: 2,
	title: 'world'
}];


app.get('/blog',(req, resp) => {
	resp.json(blogs);
});

app.post('/blog',(req, res) => {
	res.json({method: req.method});
});

app.put('/blog/:id',(req, res) => {
	res.json({method: req.method});
});

app.get('/blog/:id', (req, res) => {
	let data = blogs.filter((value) => value.id === parseInt(req.params.id));
	if(!data[0]){
		return res.status(404).json({error: 'Data not found'});
	}
	res.json(data[0]);
})

app.delete('/blog/:id', (req, res) => {
	res.json({method: req.method});
})

app.listen(port, () => {
	console.log(`Application is running on port: ${port}`);
})