const express = require('express');
const router = express.Router();
const { wrapAsync } = require('../helpers');

const cmtCtrl = require('../ctrls/cmt.ctrl');
const userCtrl = require('../ctrls/user.ctrl');

router.route('/create')
    .post(wrapAsync(cmtCtrl.create));

router.route('/read')
    .post(wrapAsync(cmtCtrl.read));

router.route('/remove')
    .post(wrapAsync(cmtCtrl.remove));

router.route('/update')
    .post(wrapAsync(cmtCtrl.update));

router.use((error, req, res, next) => {
    console.log('error!')
    
    res.json({
        name: error.name,
        message: error.message,
    })
})

module.exports = router;