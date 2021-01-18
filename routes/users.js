const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const multer = require('multer');
const path = require('path');
const logDBMiddleware = require('../middlewares/logDBMiddleware');
const {check, validationResult, body} = require('express-validator');
const guestMiddleware = require('../middlewares/guestMiddleware');
const fs = require('fs');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'tmp/my-uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({storage: storage});

router.get('/', function(req, res) {
    res.send('Users');
});

router.get('/register', guestMiddleware, usersController.register);

router.post('/register', upload.any(), logDBMiddleware, [
    check('username').isLength({min: 1}).withMessage('El campo nombre debe estar completo'),
    check('email').isEmail().withMessage('El email debe ser un email válido'),
    check('password').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    check('edad').isInt({min: 0}).withMessage('La edad debe ser numérica y mayor a 0'),
    body('email').custom(function(value) {
        let usersJSON = fs.readFileSync('users.json', {encoding: 'utf-8'});
        let users;
        if(usersJSON == "") {
            users = [];
        } else {
            users = JSON.parse(usersJSON);
        }
        
        for(let i=0; i<users.length; i++) {
            if(users[i].email == value) {
                return false;
            }
        }
        return true;
        
    }).withMessage('Usuario ya existente')
], usersController.create);

router.get('/login', usersController.login);

router.post('/login', [
    check('email').isEmail().withMessage('Email inválido'),
    check('password').isLength({min: 8}).withMessage('Contraseña incorrecta')
], usersController.processLogin);

router.get('/check', function(req, res) {
    if(req.session.usuarioLogueado == undefined) {
        res.send('No estás logueado');
    } else {
        res.send('El usuario logueado es ' + req.session.usuarioLogueado.email);
    }
})

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