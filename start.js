const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

(async () => {
	try{
		await mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
		console.log('Mongodb is successfully connected');
	} catch(e) {
		console.log("Error connnecting mongodb. Reason:", e)
	}
})();

require('./model/user.js');
require('./index.js');


