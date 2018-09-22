const express = require('express');
const router = express.Router();

// ESCUELA CONTROLLER
const escuelaController = require('../controllers/escuelaController');
const verifyToken = require('../controllers/check-auth');


router.get('/get_ciclos',  escuelaController.getAllCiclos);

router.post('/add_ciclo', escuelaController.addCiclo);

router.get('/get_niveles', escuelaController.getAllNiveles);

router.post('/add_nivel', escuelaController.addNivel);

router.get('/get_grados', escuelaController.getAllGrados);

router.post('/add_grado', escuelaController.addGrado);

router.get('/get_campus', escuelaController.getAllCampus);

router.post('/add_campus', escuelaController.addCampus);

router.get('/get_aulas', escuelaController.getAllAulas);

router.post('/add_aula', escuelaController.addAula);

router.get('/get_conceptos', escuelaController.getAllConceptos);

router.post('/add_concepto', escuelaController.addConcepto);

router.get('/get_grupos', escuelaController.getAllGrupos);

router.post('/add_grupo', escuelaController.addGrupo);



module.exports = router;