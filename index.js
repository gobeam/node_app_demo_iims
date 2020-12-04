const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/index.js');
const webRoutes = require('./routes/web.js');
const errorHandler = require('./handler/ErrorHandler');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.set('view engine','ejs');
app.use(cookieParser());
app.use(session({
	secret: process.env.SECRET,
	key: process.env.KEY,
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: mongoose.connection
	})
}))
app.use(flash());
app.use((req, res, next) => {
	res.locals.inputOld = req.flash('oldInput')[0] || {};
	res.locals.errors = req.flash('errors')[0] || {};
	res.locals.flashes = req.flash();
	// res.locals.auth = req.user || null;
	// res.locals.currentPath = req.path;
	next();
});
app.use('/api', apiRoutes);
app.use('/', webRoutes);


// 	next();
// app.use(errorHandler.flashValidationError);


app.listen(port, () => {
	console.log(`Application is running on port: ${port}`);
})

module.exports =app