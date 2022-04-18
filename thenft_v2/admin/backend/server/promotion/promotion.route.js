const express = require('express');

const promotionCtrl = require('./promotion.controller');
const router = express.Router();

router.route('/')
    .get(promotionCtrl.load)
    .post(promotionCtrl.create)

router.route('/:id')
    .post(promotionCtrl.get)

module.exports = router;