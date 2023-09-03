const express = require('express');

const AuthController = require('../../contorllers/auth');

const router = express.Router();
const jsonParser = express.json();

router.post('/register', jsonParser, AuthController.register);
router.post('/login', jsonParser, AuthController.login);

module.exports = router;