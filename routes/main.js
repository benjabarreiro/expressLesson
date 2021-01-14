const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.home);

router.get('/contact', mainController.contact);

router.get('/anArray', mainController.anArray);

router.get('/anObject', mainController.anObject);

module.exports = router;