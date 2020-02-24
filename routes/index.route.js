const express = require('express');

const users = require('./users.route');

const router = express.Router();

router.use('/users', users);

module.exports = router;