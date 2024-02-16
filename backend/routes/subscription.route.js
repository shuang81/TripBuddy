const express = require('express');
const router = express.Router();
const authUtils = require('../utils/auth.js');
const SubscriptionController = require('../controllers/subscription.controller.js');

router.get('/', authUtils.isAuthenticated, SubscriptionController.getSubscription);
router.put('/', authUtils.isAuthenticated, SubscriptionController.updateSubscription);

module.exports = router;