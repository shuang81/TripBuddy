const express = require('express');
const router = express.Router();
const authUtils = require('../utils/auth.js');
const SecurityController = require('../controllers/security.controller.js');

router.get('/', authUtils.isAuthenticated, SecurityController.getUserData);
router.put('/:userId', authUtils.isAuthenticated, SecurityController.updateUserData);

module.exports = router;