const mongoose = require('mongoose');
const app = require('./index.js');

const port = 8000;

(async () => {
	try{
		await mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
		console.log('Mongodb is successfully connected');
	} catch(e) {
		console.log("Error connnecting mongodb. Reason:", e)
	}
})();

app.listen(port, () => {
	console.log(`Application is running on port: ${port}`);
})






