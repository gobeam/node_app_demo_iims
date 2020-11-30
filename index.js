const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/index.js');
const webRoutes = require('./routes/web.js');
// const expressValidator = require('express-validator');
const {flashValidationError} = require('./handler/ErrorHandler');
const {checkSchema, check, validationResult} = require('express-validator');


const app = express();
const port = 8000;
let blogs = []; //{id:1, title: ''}
app.use(( req, res, next) => {
	console.log('validation method', validationResult(req))
	const errors = validationResult(req);
	console.log(errors);


});
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// app.use(expressValidator());


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