const router = require('express').Router();

const AuthController = require('../controllers/AuthController');
const UsersController = require('../controllers/UsersController');

const isAuth = require('../middlewares/isAuth');
const isNotAuth = require('../middlewares/isNotAuth');

router.post('/login', isNotAuth, AuthController.logIn);
router.post('/signup', isNotAuth, AuthController.signUp);
router.post('/logout', isAuth, AuthController.logOut);

router.get('/user', isAuth, UsersController.user);
router.get('/user/votes', isAuth, UsersController.votes);

module.exports = router;
