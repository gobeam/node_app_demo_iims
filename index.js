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
const methodOverride = require('method-override');

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

app.use(methodOverride('_method'))


app.use(flash());
app.use((req, res, next) => {
	res.locals.oldInput = req.flash('oldInput')[0] || {};
	res.locals.errors = req.flash('errors')[0] || {};
	res.locals.alerts = req.flash('alerts')[0] || {};
	res.locals.flashes = req.flash();
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