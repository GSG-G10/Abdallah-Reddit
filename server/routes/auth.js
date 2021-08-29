const router = require('express').Router();

const AuthController = require('../controllers/AuthController');

router.post('/login', AuthController.logIn);
router.post('/signup', AuthController.signUp);
router.post('/logout', AuthController.logOut);

module.exports = router;
