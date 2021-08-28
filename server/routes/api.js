const router = require('express').Router();

const PostsController = require('../controllers/PostsController');

router.get('/posts', PostsController.index);
router.post('/posts', PostsController.store);
router.put('/posts/:postId/like', PostsController.like);
router.delete('/posts/:postId', PostsController.destroy);

module.exports = router;
