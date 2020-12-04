const mongoose = require('mongoose');
require('dotenv').config({path:'.env'});

// mongoose.Promise = global.Promise;

(async () => {
	try{
		await mongoose.connect(process.env.DATABASE, {useNewUrlParser: true});
		console.log('Mongodb is successfully connected');
	} catch(e) {
		console.log("Error connnecting mongodb. Reason:", e)
	}
})();

require('./model/user.js');
require('./model/Product.js');
require('./index.js');


