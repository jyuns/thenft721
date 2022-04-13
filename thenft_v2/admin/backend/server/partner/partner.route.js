const express = require('express');

const partnerCtrl = require('./partner.controller');
const router = express.Router();

router.route('/')
    .get(partnerCtrl.load)
    .post(partnerCtrl.create)

    router.route('/search')
    .get(partnerCtrl.search)

module.exports = router;