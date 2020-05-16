const express = require('express');
const router = express.Router();

const UserController = require('./Controllers/UserController.js');


router.post('/', UserController.create);

module.exports = router;