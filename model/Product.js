const mongoose = require('mongoose');
// const {Schema} = mongoose;
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	name: {type: String},
	user: {type: Schema.ObjectId, ref:'User'},
	price: {type: Number},
	status: {type:Boolean},
	createdAt: { type: Date},
	updatedAt: { type: Date, default: Date.now()},
	
});

module.exports = mongoose.model('Product', ProductSchema);
