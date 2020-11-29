const mongoose = require('mongoose');
const Product = mongoose.model('Product');

// View all Products
exports.index = async (req, res) => {
 let products = await Product.find();
 res.render('system/product',{products});
}

//Create Product
exports.create = async (req, res) => {
 res.render('system/product/create');
}

// store product



//edit prouct



//update product




//delete product