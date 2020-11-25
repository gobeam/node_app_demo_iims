const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController.js');

// query all stored users
router.get('/user', UserController.get);

// store a blog
router.post('/user', UserController.store);

// Update a user by id
router.put('/user/:id', UserController.update);

// query a user through given id
router.get('/user/:id', UserController.view);

// delete a user by given id
router.delete('/user/:id', UserController.destroy);


module.exports = router;