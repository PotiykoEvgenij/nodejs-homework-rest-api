const express = require('express');

const AuthController = require('../../contorllers/auth');

const auth = require('../../middleware/auth');

const router = express.Router();
const jsonParser = express.json();

router.post('/register', jsonParser, AuthController.register);
router.post('/login', jsonParser, AuthController.login);
router.post('/logout', auth, AuthController.logout);
router.get('/current', auth, AuthController.current);

module.exports = router;