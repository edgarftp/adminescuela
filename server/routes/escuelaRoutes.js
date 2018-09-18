const express = require('express');
const router = express.Router();

// ESCUELA CONTROLLER
const escuelaController = require('../controllers/escuelaController');


router.get('/get_ciclos', escuelaController.getAllCiclos);

router.post('/add_ciclo', escuelaController.addCiclo);

module.exports = router;