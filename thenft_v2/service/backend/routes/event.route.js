const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/event.controller');

router.route('/')
    .post(ctrl.load)

router.route('/next')
    .post(ctrl.next)

router.route('/total')
    .post(ctrl.total)

module.exports = router;