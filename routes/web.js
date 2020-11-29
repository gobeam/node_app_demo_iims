const express = require('express');
const router = express.Router();
const userController = require('../controller/web/UserController');

router.get('/', userController.index);
// router.get('/',(req, res)=>{
//
// })

module.exports = router;