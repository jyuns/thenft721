const express = require('express');

const eventCtrl = require('./event.controller');
const router = express.Router();

router.route('/')
    .get(eventCtrl.load)
    .post(eventCtrl.create)

router.route('/:id')
    .post(eventCtrl.get)

router.route('/:id')
    .delete(eventCtrl.remove)

module.exports = router;