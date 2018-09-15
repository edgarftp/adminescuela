const express = require('express');
const router = express.Router();

// TODO CONTROLLER
const authController = require('../controllers/authController');


router.post('/posts', authController.verifyToken, authController.post);

router.post('/login', authController.login);

module.exports = router;