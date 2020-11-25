const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('system/pages');
})
// router.get('/',(req, res)=>{
//
// })

module.exports = router;