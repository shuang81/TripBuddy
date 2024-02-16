const User = require('../models/user.model.js');
const { createNotification } = require('./notification.controller.js');

// get users that the authenticated user added as emergency contacts
exports.getUserEmergency = async (req, res) => {
  try {
    const userId = res.locals.userId;
    const user = await User.findById(userId)
    const emergencyContacts = await User.find({_id: {$in: user.emergencyContacts}}).select('-password');
    return res.status(200).json(emergencyContacts);
  } catch (err) {
    res.status(500).send({message: 'Server error'});
  }
};

// add new user to emergency contacts list
exports.addEmergencyContact = async (req, res) => {
  try {
    const emergencyContact = await User.findOne({email: req.params.email})

    if (!emergencyContact){
      return res.status(404).send({success: false, message: "Emergency contact was not found by this email"});
    }
    await User.updateOne({_id: res.locals.userId}, {$push: {emergencyContacts: emergencyContact._id}})
    await createNotification(res.locals.userId, `New emergency contact was added: ${req.params.email}`)
    const user = await User.findById(res.locals.userId)
    return res.status(200).json(user?.emergencyContacts);


  } catch (err) {
    res.status(500).send({success: false, message: 'Server error' + err});
  }
};

// remove user from emergency contacts
exports.removeEmergencyContact = async (req, res) => {
  try {
    await User.updateOne({_id: res.locals.userId}, {$pull: {emergencyContacts: req.params.id}})
    await createNotification(res.locals.userId, `Emergency contact was successfully removed`)
    const user = await User.findById(res.locals.userId)
    return res.status(200).json(user?.emergencyContacts);
  } catch (err) {
    res.status(500).send({message: 'Server error' + err});
  }
};

// send message to emergency contact
exports.sendMessage = async (req, res) => {
  try {
    const messageTo = req.params.id;
    const messageFrom = await User.findById(res.locals.userId);
    const message = req.body.message;
  
    await createNotification(messageTo, `You received a message from ${messageFrom?.username}: ${message}`)
    return res.status(200).json({success: true, message: "Message sent"});
  } catch (err){
    res.status(500).send({message: 'Server error' + err});
  }
}

//gets list of users with this user as their emergency contact
exports.getUsersWithThisEmergencyContact = async (req, res) => {  
  try {
    const userId = res.locals.userId;
    
    const emergencyContacts = await User.find({emergencyContacts: {$elemMatch: {$eq: userId}}}).select('firstName lastName username email address phone');
    return res.status(200).json(emergencyContacts);
  } catch (err) {
    res.status(500).send({message: 'Server error'});
  }
};