const router = require('express').Router();

const ErrorsController = require('../controllers/ErrorsController');

const authRoutes = require('./auth');
const apiRoutes = require('./api');

router.use(authRoutes);
router.use('/api', apiRoutes);

router.use(ErrorsController.notFound);
router.use(ErrorsController.serverError);

module.exports = router;
