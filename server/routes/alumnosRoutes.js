const express = require('express');
const router = express.Router();

// ESCUELA CONTROLLER
const alumnosController = require('../controllers/alumnosController');
const verifyToken = require('../controllers/check-auth');



router.get('/get_alumnos',alumnosController.getAllAlumnos);

router.post('/add_alumno',alumnosController.addAlumno);

router.get('/get_familias',alumnosController.getAllFamilias);

router.post('/add_familia',alumnosController.addFamilia);

router.get('/get_inscripciones', alumnosController.getAllInscripciones);

router.post('/add_inscripcion',alumnosController.addInscripcion);

//inscripcion conceptos

router.get("/get_conceptosalumno/:id", alumnosController.conceptosAlumno);

//add pagos
router.post('/add_pagos',alumnosController.addPagos);









module.exports = router;