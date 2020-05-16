const express = require('express');

const auth = require('./auth.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ res: "hello"});
});

router.use('/auth', auth);

module.exports = router;