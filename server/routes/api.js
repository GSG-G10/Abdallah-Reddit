const router = require('express').Router();

const PostsController = require('../controllers/PostsController');
const CommentsController = require('../controllers/CommentsController');
const UsersController = require('../controllers/UsersController');

const isAuth = require('../middlewares/isAuth');

router.get('/posts', PostsController.index);
router.post('/posts', isAuth, PostsController.store);
router.get('/posts/:postId', PostsController.show);
router.put('/posts/:postId/vote', isAuth, PostsController.votePost);
router.delete('/posts/:postId', isAuth, PostsController.destroy);

router.get('/posts/:postId/comments', CommentsController.index);
router.post('/comments', isAuth, CommentsController.store);
// router.put('/comments/:postId/like', isAuth, CommentsController.like);

router.get('/users/:userId/posts', UsersController.posts);

module.exports = router;
