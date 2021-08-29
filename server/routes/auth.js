const router = require('express').Router();

const AuthController = require('../controllers/AuthController');

const isAuth = require('../middlewares/isAuth');
const isNotAuth = require('../middlewares/isNotAuth');

router.post('/login', isNotAuth, AuthController.logIn);
router.post('/signup', isNotAuth, AuthController.signUp);
router.post('/logout', isAuth, AuthController.logOut);

module.exports = router;
