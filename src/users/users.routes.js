const express = require('express');
const router = express.Router();
const usersController = require('./users.controller');

/**
 * @api {post} /apis/user/login Request User Authenication
 * @apiName Login User
 * @apiGroup User
 *
 * @apiParam {String} email
 * @apiParam {String} password
 *
 * @apiSuccess {String} token  access token 
 */
router.post('/login',usersController.login);

/**
 * @api {post} /apis/user/register Request User Registeration
 * @apiName Register User
 * @apiGroup User
 *
 * @apiParam {String} firstname
 * @apiParam {String} lastname
 * @apiParam {String} email
 * @apiParam {String} password
 *
 * @apiSuccess {String} success
 * @apiSuccess {Object} data
 */
router.post('/register' ,usersController.addUsers);

module.exports = router