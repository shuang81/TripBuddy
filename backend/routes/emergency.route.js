const express = require('express');
const router = express.Router();
const authUtils = require('../utils/auth.js');
const EmergencyController = require('../controllers/emergency.controller.js');


router.get('/', authUtils.isAuthenticated, EmergencyController.getUserEmergency); // get contacts that this user saved as emergency
router.put('/add/:email', authUtils.isAuthenticated, EmergencyController.addEmergencyContact);
router.put('/remove/:id', authUtils.isAuthenticated, EmergencyController.removeEmergencyContact);
router.put('/sendMessage/:id', authUtils.isAuthenticated, EmergencyController.sendMessage);
router.get('/others', authUtils.isAuthenticated, EmergencyController.getUsersWithThisEmergencyContact); //gets users with this user as their emergency contact

module.exports = router;