const router = require('express').Router();

const authRoutes = require('./auth');
const apiRoutes = require('./api');

router.use(authRoutes);
router.use('/api', apiRoutes);

module.exports = router;
