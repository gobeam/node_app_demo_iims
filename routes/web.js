const express = require('express');
const router = express.Router();
const userController = require('../controller/web/UserController');
const productController = require('../controller/web/ProductController');
const productValidator = require('../validator/ProductValidator');
const {catchError} =require('../handler/ErrorHandler');



router.get('/', userController.index);
router.get('/product', productController.index);
router.get('/product/create', productController.create);
router.post('/product', [productValidator], catchError(productController.store));


module.exports = router;