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
exports.store = async(req, res) => {
 let {name, status, price} = req.body;
 let product = new Product();
 product.name = name;
 product.price = price;
 product.status = status;
 product.createdAt = Date.now();
 await product.save();
 res.redirect('/product');
}



//edit prouct



//update product




//delete product