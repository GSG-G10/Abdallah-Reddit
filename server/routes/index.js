const router = require('express').Router();

const ErrorsController = require('../controllers/ErrorsController');

const authRoutes = require('./auth');
const apiRoutes = require('./api');
const webRoutes = require('./web');

// auth routes
router.use('/auth', authRoutes);

// api routes
router.use('/api', apiRoutes);

// pages routes
router.use(webRoutes);

router.use(ErrorsController.notFound);
router.use(ErrorsController.serverError);

module.exports = router;
