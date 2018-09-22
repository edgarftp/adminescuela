const express = require('express');
const router = express.Router();


// USERS CONTROLLER
const userController = require('../controllers/userController');
const verifyToken = require('../controllers/check-auth');

router.get("/get_users",  userController.getUsers);

router.post('/signup', userController.signUpUser);

router.post('/login', userController.loginUser)

router.delete('/delete/:id',  userController.deleteUser);

module.exports = router;