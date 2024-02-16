const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    notification:
    {
        type: String,
    },
    email:
    {
        type: String,
    },
    notificationFor: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: { type: Date, default: Date.now },
    isRead: {
        type: Boolean,
        default: false,
    },
})

module.exports = mongoose.model('Notification', notificationSchema);