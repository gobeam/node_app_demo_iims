const mongoose = require('mongoose');
const {Schema} = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
	email: {type: String},
	firstName: {type: String},
	lastName: {type: String},
	address: {type: String},
	phone: {type: String},
	age: {type: Number},
	status: {type: Boolean},
	createdAt: { type: Date, default: Date.now },
});

UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'});
module.exports = mongoose.model('User', UserSchema);
