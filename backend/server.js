// starting point of the server side of the application
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const configureDB = require('./config/db.config');
const configureApp = require('./config/app.config');

// load configurations
configureDB();
const app = configureApp();

// start the app on port 5000
app.listen(process.env.PORT || 5000);

module.exports = app;

console.log(`Express server is running at ${process.env.URL} on port ${process.env.PORT}`);