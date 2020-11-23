const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');


const app = express();
const port = 8000;
let blogs = []; //{id:1, title: ''}


app.use(bodyParser.json());

app.use((req, resp, next)=> {
	console.log('this is middleware example');
	next();
})
app.use('/', routes);


app.listen(port, () => {
	console.log(`Application is running on port: ${port}`);
})

module.exports =app