const router = require('express').Router();

const AuthController = require('../controllers/AuthController');

const isAuth = require('../middelwares/isAuth');
const isNotAuth = require('../middelwares/isNotAuth');

router.post('/login', isNotAuth, AuthController.logIn);
router.post('/signup', isNotAuth, AuthController.signUp);
router.post('/logout', isAuth, AuthController.logOut);

module.exports = router;
