const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'tmp/my-uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({storage: storage});

router.get('/', function(req, res) {
    res.send('Users');
});

router.get('/register', usersController.register);

router.post('/register', upload.any(), usersController.create);

router.get('/login', usersController.login);

router.post('/login', usersController.processLogin);

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