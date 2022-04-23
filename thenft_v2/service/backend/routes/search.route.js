const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/search.controller');

router.route('/')
    .get(ctrl.load)

module.exports = router;