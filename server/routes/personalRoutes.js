const express = require('express');
const router = express.Router();

// ESCUELA CONTROLLER
const personalController = require('../controllers/personalController');
const verifyToken = require('../controllers/check-auth');



router.get('/get_profesores', personalController.getAllProfesores);

router.post('/add_profesor',  personalController.addProfesor);




module.exports = router;