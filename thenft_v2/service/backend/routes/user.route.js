const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/user.controller');

router.route('/verify')
    .post(ctrl.verify)

router.route('/signin')
    .post(ctrl.signin)

router.route('/signup')
    .post(ctrl.signup)

module.exports = router;