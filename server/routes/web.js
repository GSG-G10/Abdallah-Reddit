const router = require('express').Router();

const PagesController = require('../controllers/PagesController');

router.get('/posts/:postId', PagesController.post);
router.get('/profile/:userId', PagesController.profile);

module.exports = router;
