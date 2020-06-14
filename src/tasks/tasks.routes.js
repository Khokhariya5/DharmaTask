const express = require('express');
const router = express.Router();

const jwtAuth = require("../../middlewares/jwtAuth");

const tasksController = require('./tasks.controller');

router.get('/user', jwtAuth,tasksController.getTaskByUserId);

router.post('/create', jwtAuth,tasksController.addTask);

router.get('/all',tasksController.getAllTaskData);

module.exports = router