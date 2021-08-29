const router = require('express').Router();

const PostsController = require('../controllers/PostsController');
const CommentsController = require('../controllers/CommentsController');

router.get('/posts', PostsController.index);
router.post('/posts', PostsController.store);
router.put('/posts/:postId/like', PostsController.like);
router.delete('/posts/:postId', PostsController.destroy);

router.get('/posts/:postId/comments', CommentsController.index);
router.post('/comments', CommentsController.store);
router.put('/comments/:postId/like', CommentsController.like);

module.exports = router;
