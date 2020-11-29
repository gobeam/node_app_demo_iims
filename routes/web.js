const express = require('express');
const router = express.Router();
const userController = require('../controller/web/UserController');
const productController = require('../controller/web/ProductController');

router.get('/', userController.index);
router.get('/product', productController.index);
router.get('/product/create', productController.create);


module.exports = router;