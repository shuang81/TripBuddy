const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
    sampleName: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Sample', sampleSchema);