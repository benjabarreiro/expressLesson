const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', function(req, res) {
    res.send('Users');
});

router.get('/register', usersController.register);

router.post('/register', usersController.create);

router.get('/login', usersController.login);

router.get('/list', usersController.list);

router.get('/search', usersController.search);

router.get('/edit/:idUser', usersController.edit);

router.put('/edit', function(req, res) {
    res.send('Fui por PUT');
});

router.delete('/delete/:idUser', function(req, res) {
    res.send('SOY DELETE');
});

module.exports = router;