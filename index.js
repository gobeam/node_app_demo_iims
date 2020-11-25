const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/index.js');
const webRoutes = require('./routes/web.js');


const app = express();
const port = 8000;
let blogs = []; //{id:1, title: ''}


app.use(bodyParser.json());
app.set('view engine','ejs');

app.use((req, resp, next)=> {
	console.log('this is middleware example');
	next();
})
app.use('/api', apiRoutes);
app.use('/', webRoutes);


app.listen(port, () => {
	console.log(`Application is running on port: ${port}`);
})

module.exports =app