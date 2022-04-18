const express = require('express');

const newsCtrl = require('./news.controller');
const router = express.Router();

router.route('/')
    .get(newsCtrl.load)
    .post(newsCtrl.create)

router.route('/:id')
    .post(newsCtrl.get)

router.route('/:id')
    .delete(newsCtrl.remove)

module.exports = router;