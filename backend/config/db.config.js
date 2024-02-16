const mongoose = require('mongoose');

module.exports = async () => {
    const db = mongoose.connect(process.env.DB_URL, {
        useUnifiedTopology: true,
		useNewUrlParser: true, 
    })
    .then(() => console.log("Database connected!"))
    .catch((error) => {console.log(`Error happened: ${error}`)})

    // Load db models
    require('../models/sample.model');

    return db;
}