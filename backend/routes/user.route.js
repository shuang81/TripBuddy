const express = require('express');
const UserController = require('../controllers/user.controller.js');
const authUtils = require('../utils/auth.js')
const router = express.Router();

router.post('/login', UserController.processLogin);
router.post('/register', UserController.processRegistration);
router.get('/logout', UserController.processLogout);
router.get('/auth', UserController.getAuthImageUploadData);
router.post('/subscribeTo/:id', authUtils.isAuthenticated, UserController.subscribeToContentProvider);
router.put('/cancelSubscribe/:id', authUtils.isAuthenticated, UserController.cancelSubscribeToContentProvider);//API to cancel subscribe to

module.exports = router;