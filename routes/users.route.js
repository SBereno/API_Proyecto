const express = require('express');
const router = express.Router({ mergeParams: true });

const usersController = require('../controllers/users.controller');

router.route('/login').post(usersController.loginAttempt);

router.route('/signup').post(usersController.signUp);

module.exports = router;