const express = require('express');
//const validate = require('express-validation');
const collectionCtrl = require('./collection.controller');

const router = express.Router();

router.route('/')
    .get(collectionCtrl.load)
    .post(collectionCtrl.create)

router.route('/search')
    .get(collectionCtrl.search)

module.exports = router;