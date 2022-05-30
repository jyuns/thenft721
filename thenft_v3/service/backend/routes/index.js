const express = require('express');
const router = express.Router();

router.get('/health-check', (req, res) => {
    res.send('OK')
})

const cmtRoute = require('./cmt.route');
router.use('/cmt', cmtRoute);

const userRoute = require('./user.route');
router.use('/user', userRoute);

const codeRoute = require('./code.route');
router.use('/code', codeRoute);

module.exports = router;