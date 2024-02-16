const express = require('express');
const router = express.Router();
const authUtils = require('../utils/auth.js');
const ManageController = require('../controllers/manage.controller.js');


router.get('/', authUtils.isAuthenticated, ManageController.getUserData);

module.exports = router;