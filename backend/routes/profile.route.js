const express = require('express');
const router = express.Router();
const authUtils = require('../utils/auth.js');
const ProfileController = require('../controllers/profile.controller.js');

router.get('/', authUtils.isAuthenticated, ProfileController.getUserProfile);
router.put('/', authUtils.isAuthenticated, ProfileController.updateProfile);
router.get('/getSubscribedTo', authUtils.isAuthenticated, ProfileController.getSubscribedTo);
router.put('/updateChecklist', authUtils.isAuthenticated, ProfileController.updateChecklist);
router.get('/getChecklist', authUtils.isAuthenticated, ProfileController.getChecklist);
router.get('/getContentProvider/:id', ProfileController.getContentProviderProfile);

module.exports = router;