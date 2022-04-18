const express = require('express');

const imageCtrl = require('./image.controller');
const router = express.Router();
const upload = require('../../module/multer.module');

router.route('/')
    .post(upload.single('image'), imageCtrl.upload)
    
module.exports = router;