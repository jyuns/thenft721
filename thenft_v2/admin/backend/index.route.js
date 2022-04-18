const express = require('express');
const collectionRoutes = require('./server/collection/collection.route');
const partnerRoutes = require('./server/partner/partner.route');
const projectRoutes = require('./server/project/project.route');
const imageRoutes = require('./server/image/image.route.js');
const eventRoutes = require('./server/event/event.route.js');
const newsRoutes = require('./server/news/news.route.js');
const promotionRoutes = require('./server/promotion/promotion.route.js');

const router = express.Router();

router.get('/health-check', (req, res) => {
    res.send('OK')
})

router.use('/collections', collectionRoutes)
router.use('/partners', partnerRoutes)
router.use('/projects', projectRoutes)
router.use('/events', eventRoutes)
router.use('/news', newsRoutes)
router.use('/promotions', promotionRoutes)
router.use('/image', imageRoutes)

module.exports = router;