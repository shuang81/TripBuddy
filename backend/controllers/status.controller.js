const User = require('../models/user.model.js');

// get user role within the application ('User', 'IT', 'Security')
exports.getStatus = async (req, res) => {
    try {
      const user = await User.findById(res.locals.userId);
      res.json({status: user.status});
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  };

// update role of the user
exports.updateStatus = async (req, res) => {
    const { status } = req.body;

    // check if the status is valid
    if (!['User', 'IT', 'Security'].includes(status)) {
        return res.status(400).send({status});
      }

    try {
      const user = await User.findById(res.locals.userId);
      user.status = status;
        
        await user.save();
        res.json({status: user.status});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};