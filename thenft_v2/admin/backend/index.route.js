const express = require('express');
const collectionRoutes = require('./server/collection/collection.route');
const partnerRoutes = require('./server/partner/partner.route');
const projectRoutes = require('./server/project/project.route');
const imageRoutes = require('./server/image/image.route');

const router = express.Router();

router.get('/health-check', (req, res) => {
    res.send('OK')
})

router.use('/collection', collectionRoutes)
router.use('/partner', partnerRoutes)
router.use('/project', projectRoutes)
router.use('/image', imageRoutes)

module.exports = router;