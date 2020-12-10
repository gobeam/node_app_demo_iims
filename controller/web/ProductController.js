const mongoose = require('mongoose');
const Product = mongoose.model('Product');



// index

// View all Products
exports.index = async (req, res) => {
    let products = await Product.find({user: req.user._id});
    res.render('system/product', {products});
};

//Create Product
exports.create = async (req, res) => {
    res.render('system/product/create');
};

// Edit product
exports.edit = async (req, res) => {
    let product = await Product.findById(req.params.id);
    res.render('system/product/edit', {product});
};

// update product
exports.update = async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (product) {
        let {name, status, price} = req.body;
        product.name = name;
        product.price = price;
        product.status = status;
        product.updatedAt = Date.now();
        await product.save();
        req.flash('alerts', {
            type: 'success',
            message: 'Product successfully updated!'
        });
    }
    res.redirect('/product');
};

// store product
exports.store = async (req, res) => {
    let {name, status, price} = req.body;
    let product = new Product();
    product.user = req.user._id;
    product.name = name;
    product.price = price;
    product.status = status;
    product.createdAt = Date.now();
    await product.save();
    req.flash('alerts', {
        type: 'success',
        message: 'Product successfully added!'
    });
    res.redirect('/product');
};

//delete product
exports.destroy = async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        req.flash('alerts', {
            type: 'success',
            message: 'Product successfully deleted!'
        });
        res.redirect('/product');
        return;
    }
    req.flash('alerts', {
        type: 'warning',
        message: 'Product not found!'
    });
    res.redirect('/product');

};
