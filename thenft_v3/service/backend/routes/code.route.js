const express = require('express');
const router = express.Router();
const { wrapAsync } = require('../helpers');

const codeCtrl = require('../ctrls/code.ctrl');

router.route('/register')
    .post(
        wrapAsync(codeCtrl.validate),
        wrapAsync(codeCtrl.register)
    );

router.use((error, req, res, next) => {
    console.log('error!')
    
    res.json({
        name: error.name,
        message: error.message,
    })
})

module.exports = router;