const express = require('express');

const AuthController = require('../../contorllers/auth');

const router = express.Router();
const jsonParses = express.json();

router.post('/register', jsonParses, AuthController.register);

module.exports = router;