const express = require("express");

const router = express.Router();
const app = express();

const usersController = require("./users.controller");


/** GET /api-status - Check service status **/
router.get('/all', usersController.getAllUsers);

module.exports =  router;