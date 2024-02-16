const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
    },
    answer: {
        type: String,
    },
    questionBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Question', questionSchema);