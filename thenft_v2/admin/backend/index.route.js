const express = require('express');
const collectionRoutes = require('./server/collection/collection.route');

const router = express.Router();

router.get('/health-check', (req, res) => {
    res.send('OK')
})

router.use('/collection', collectionRoutes)

module.exports = router;