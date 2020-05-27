const express = require('express');
const router = express.Router();

const jwtAuth = require("../../middlewares/jwtAuth");

const citiesController = require('./cities.controller');

/**
 * @api {get} /apis/city/cities Request List Of Cities
 * @apiName getCitits
 * @apiGroup City
 * 
 * @apiHeader x-access-token
 * 
 * @apiSuccess {Object} data
 */
router.get('/cities', jwtAuth,citiesController.getCities);

//router.post('/create',citiesController.addCity);

module.exports = router