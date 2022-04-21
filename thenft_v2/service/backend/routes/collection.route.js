const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/collection.controller');

router.route('/')
    .get(ctrl.load)

module.exports = router;