const router = require('express').Router();

const PostsController = require('../controllers/PostsController');
const CommentsController = require('../controllers/CommentsController');

const isAuth = require('../middelwares/isAuth');

router.get('/posts', PostsController.index);
router.post('/posts', isAuth, PostsController.store);
router.put('/posts/:postId/like', isAuth, PostsController.like);
router.delete('/posts/:postId', isAuth, PostsController.destroy);

router.get('/posts/:postId/comments', CommentsController.index);
router.post('/comments', isAuth, CommentsController.store);
router.put('/comments/:postId/like', isAuth, CommentsController.like);

module.exports = router;
