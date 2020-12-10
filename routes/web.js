const express = require('express');
const router = express.Router();
const userController = require('../controller/web/UserController');
const productController = require('../controller/web/ProductController');
const productValidator = require('../validator/ProductValidator');
const {userValidator, loginValidator} = require('../validator/UserValidator');
const authController = require('../controller/web/AuthController');
const {catchError, flashValidationError} =require('../handler/ErrorHandler');



router.get('/', authController.isLoggedIn, userController.index);
router.get('/product', authController.isLoggedIn, productController.index);
router.get('/product/create', authController.isLoggedIn, productController.create);
router.post('/product', [productValidator, authController.isLoggedIn,], catchError(productController.store));
router.get('/product/:id/edit', authController.isLoggedIn, catchError(productController.edit));
router.put('/product/:id', [productValidator, authController.isLoggedIn,], catchError(productController.update));
router.delete('/product/:id',authController.isLoggedIn,  catchError(productController.destroy));

router.get('/register', authController.checkIfLoggedIn, authController.registerView);
router.post('/register', [userValidator], catchError(authController.register));
router.get('/login', authController.checkIfLoggedIn, authController.loginView);
router.post('/login', [loginValidator], flashValidationError, authController.login);
router.get('/logout', authController.logout);


module.exports = router;
