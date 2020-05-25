const express = require('express');
const NotesController = require('./Controllers/NotesController');
const AuthController = require('./Controllers/AuthController');
const auth = require('./auth.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ res: "hello"});
});

router.use('/auth', auth);


router.use(AuthController.checkToken);

router.get('/notes', AuthController.isLoggedIn , NotesController.index);
router.post('/notes/save', AuthController.isLoggedIn , NotesController.save);
router.post('/notes/new', AuthController.isLoggedIn , NotesController.create);
router.delete('/notes', AuthController.isLoggedIn , NotesController.delete);

module.exports = router;