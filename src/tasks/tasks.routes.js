const express = require("express");

const router = express.Router();
const app = express();

//Middlewares
const jwtAuth = require("../../middlewares/jwtAuth");

//Controllers
const tasksController = require("./tasks.controller");

router.get('/all', jwtAuth, tasksController.getAllTasks);

module.exports =  router;