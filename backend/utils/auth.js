const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

// helper functions to handle authentication
exports.UserDisplayName = (req, res) => {
  if (req.user) {
    return req.user.displayName;
  }
  return "";
}
exports.UserId = (req) => {
  if (req.user) {
    return req.user._id;
  }
  return "";
}

// authentication middleware 
exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.get('authorization')
  if (!authHeader){
    return res.status(403).json({ success: false, message: 'Token is not provided' });
  }
  const token = authHeader.split(' ')[1]
  try {
    const verified = jwt.verify(token, secret)
    res.locals.userId = verified.id // set id of the user who is authenticated to use in the next request
  } catch (error){
    return res.status(401).json({ success: false, message: 'Token is invalid' });
  }
  return next();
}

// generate JWT token
exports.GenerateToken = (user) => {
  const payload = {
    id: user._id,
    displayName: user.displayName,
    userName: user.userName,
    emailAddress: user.emailAddress,
  };

  const jwtOptions = {
    expiresIn: '30d',
  };

  return jwt.sign(payload, secret, jwtOptions);
}

exports.auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
