const express = require('express');
const router = express.Router();
const { wrapAsync } = require('../helpers');

const userCtrl = require('../ctrls/user.ctrl');

router.route('/create')
    .post(
        wrapAsync(userCtrl.validate),
        wrapAsync(userCtrl.duplicate),
        wrapAsync(userCtrl.create),
        wrapAsync(userCtrl.signin),
    );

router.route('/remove')
    .post(
        wrapAsync(userCtrl.remove),
    );

router.route('/read')
    .post(
        wrapAsync(userCtrl.validate),
        wrapAsync(userCtrl.read),
    );

router.route('/signin')
    .post(
        wrapAsync(userCtrl.validate),
        wrapAsync(userCtrl.signin),
    );

router.route('/auth')
    .post(
        wrapAsync(userCtrl.auth),
        wrapAsync(userCtrl.refresh),
    )

router.route('/membership')
    .post(wrapAsync(userCtrl.membership))

router.use((error, req, res, next) => {
    console.log('error!')

    res.json({
        name: error.name,
        message: error.message,
    })
})

module.exports = router;