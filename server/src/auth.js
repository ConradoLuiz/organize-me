const express = require('express');
const router = express.Router();

const UserController = require('./Controllers/UserController.js');
const AuthController = require('./Controllers/AuthController');

router.post('/signup', UserController.create);
router.post('/login', UserController.index);
router.get('/verify/:token', AuthController.verifyUserToken);

module.exports = router;