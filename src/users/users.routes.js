const express = require('express');
const router = express.Router();
const usersController = require('./users.controller');

router.post('/login',usersController.login);

router.post('/register' ,usersController.addUsers);

module.exports = router