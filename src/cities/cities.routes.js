const express = require('express');
const router = express.Router();

const jwtAuth = require("../../middlewares/jwtAuth");

const citiesController = require('./cities.controller');

router.get('/cities', citiesController.getCities);

router.post('/create',citiesController.addCity);

module.exports = router