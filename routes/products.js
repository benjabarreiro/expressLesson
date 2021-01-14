const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.products);

router.get('/:id', productsController.detail);

router.get('/:id/opinions/:idOpinion?', productsController.opinion);

module.exports = router;