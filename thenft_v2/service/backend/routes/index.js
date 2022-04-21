const express = require('express');

const router = express.Router();

router.get('/health-check', (req, res) => {
    res.send('OK')
})

const collectionRoute = require('./collection.route');
router.use('/collection', collectionRoute);

const eventRoute = require('./event.route');
router.use('/event', eventRoute);

module.exports = router;