const User = require('../models/user.model.js')
const { createNotification } = require('./notification.controller.js');

// get current subscription of the user
exports.getSubscription = async (req, res) => {
  try {
    const user = await User.findById(res.locals.userId);
    return res.status(200).send({subscription: user.subscription});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error ' + err);
  }
};

// update subscription information
exports.updateSubscription = async (req, res) => {
  const { subscription } = req.body;

  // check if subscription is valid
  if (!['Basic', 'Premium', 'Business'].includes(subscription)) {
      return res.status(400).send({subscription});
    }

  try {
      await User.updateOne({_id: res.locals.userId}, {subscription: subscription});
      const user = await User.findById(res.locals.userId);

      // send notification to the user
      await createNotification(res.locals.userId, `Your subscription plan is now ${user.subscription}`)

      return res.status(200).send({subscription: user.subscription});    
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error ' + err);
  }
};