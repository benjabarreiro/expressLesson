const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.home);

router.get('/contact', mainController.contact);

router.get('/anArray', mainController.anArray);

router.get('/anObject', mainController.anObject);

router.get('/pruebaSession', function(req, res) {
    if(req.session.numeroVisitas == undefined) {
        req.session.numeroVisitas = 0;
    }
    req.session.numeroVisitas++;
    res.send('Session tiene el número: ' + req.session.numeroVisitas);
});

router.get('/mostrarNumeroSession', function(req, res) {
    res.send('Session tiene el número: ' + req.session.numeroVisitas);
})

module.exports = router;