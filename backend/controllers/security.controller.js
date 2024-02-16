const User = require('../models/user.model.js');

// get data of all users for security admin
exports.getUserData = async (req, res) => {
    try {
        const users = await User.find({ status: 'User' }, 'username email phone disable'); // Retrieve only username, email, and phone fields
        
        if (!users) {
            return res.status(404).json({ message: 'User not found' });
          }
      
        res.status(200).json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

// enable or disable the user
exports.updateUserData = async (req, res) => {
  try {
    const { userId } = req.params;
    const { disable } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { disable: disable },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ message: 'Error updating user status' });
  }
};
