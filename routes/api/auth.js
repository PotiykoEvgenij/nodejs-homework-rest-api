const express = require('express');

const AuthController = require('../../contorllers/auth');

const auth = require('../../middleware/auth');
const upload = require('../../middleware/storage');

const router = express.Router();
const jsonParser = express.json();

router.post('/register', jsonParser, AuthController.register);
router.post('/login', jsonParser, AuthController.login);
router.post('/logout', auth, AuthController.logout);
router.get('/current', auth, AuthController.current);
router.patch('/avatars', auth, upload.single('avatar'), AuthController.avatar);

module.exports = router;