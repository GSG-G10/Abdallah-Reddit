const router = require('express').Router();

const ErrorsController = require('../controllers/ErrorsController');

const authRoutes = require('./auth');
const apiRoutes = require('./api');

router.use('/auth', authRoutes);
router.use('/api', apiRoutes);
router.get('/login', (req, res) => {
  // handel login in page
  res.json('login page');
});
router.use(ErrorsController.notFound);
router.use(ErrorsController.serverError);

module.exports = router;
