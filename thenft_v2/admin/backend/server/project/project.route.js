const express = require('express');

const projectCtrl = require('./project.controller');
const router = express.Router();

router.route('/')
    .get(projectCtrl.load)
    .post(projectCtrl.create)

    router.route('/search')
    .get(projectCtrl.search)

module.exports = router;