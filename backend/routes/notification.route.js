const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notification.controller')
const authUtils = require('../utils/auth.js')

router.post('/addNotification', authUtils.isAuthenticated, NotificationController.createNewNotification)//API to add a new notification
router.get('/getNotifications', authUtils.isAuthenticated, NotificationController.getNewNotifications)//API to get notifications
router.delete('/deleteById/:id', authUtils.isAuthenticated, NotificationController.deleteNotification)

module.exports = router;