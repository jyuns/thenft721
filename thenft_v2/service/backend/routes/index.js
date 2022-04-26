const express = require('express');

const router = express.Router();

router.get('/health-check', (req, res) => {
    res.send('OK')
})

const collectionRoute = require('./collection.route');
router.use('/collection', collectionRoute);

const eventRoute = require('./event.route');
router.use('/event', eventRoute);

const searchRoute = require('./search.route');
router.use('/search', searchRoute);

const userRoute = require('./user.route');
router.use('/auth', userRoute);

module.exports = router;