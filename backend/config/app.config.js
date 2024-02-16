const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const compress = require('compression');
const methodOverride = require('method-override');
const passport = require('passport');
const flash = require('flash');
const session = require('express-session');
const passportJWT = require('passport-jwt');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const User = require('../models/user.model');


// load env variables
require('dotenv').config();

// import routers
const sampleRoute = require('../routes/sample.route');
const userRoute = require('../routes/user.route');
const postsRoute = require('../routes/posts.route');
const categoryRoute = require('../routes/category.route');
const profileRoute = require('../routes/profile.route');
const emergencyRoute = require('../routes/emergency.route.js');
const paymentRoute = require('../routes/payment.route');
const subscriptionRoute = require('../routes/subscription.route');
const statusRoute = require('../routes/status.route.js');
const manageRoute = require('../routes/manage.route.js');
const securityRoute = require('../routes/security.route.js');
const questionRoute = require('../routes/question.route');
const notificationRoute = require('../routes/notification.route');

// configure passport and JWT athentication
const secret = process.env.JWT_SECRET;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;

// create auth strategy
let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) =>{
  User.findById(jwt_payload.id)
  .then(user =>{
      return done(null, user)
  })
  .catch(error =>{
      return done(err,false)
  });
});

passport.use(strategy);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// configure the application
module.exports = () => {
  const app = express();

  // use auth session
  app.use(session({
    secret: secret,
    saveUninitialized: false, 
    resave: false
  }));

  if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production'){
    app.use(compress());
  }

  // use body and cookie parser
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(cors());

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(methodOverride());
  app.use(methodOverride('_method'));
  app.use(flash());

  // configure and use routes
  app.use('/api/sample', sampleRoute);
  app.use('/api/user', userRoute);
  app.use('/api/posts', postsRoute)
  app.use('/api/profile', profileRoute);
  app.use('/api/category', categoryRoute)
  app.use('/api/payment', paymentRoute);
  app.use('/api/subscription', subscriptionRoute);
  app.use('/api/emergency', emergencyRoute);
  app.use('/api/status', statusRoute);
  app.use('/api/manage', manageRoute);
  app.use('/api/security', securityRoute);
  app.use('/api/question', questionRoute);
  app.use('/api/notification', notificationRoute);


  return app;
}
