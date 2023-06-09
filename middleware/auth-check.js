require("../models/User");
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const dotenv = require('dotenv');
const config = require('../config') 




const auth = (req, res, next) => {
  dotenv.config( { path : '.env'} );

  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  const token = req.headers.authorization.split(' ')[1];

  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;

    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }
      req.user = user
      return next();
    });
  });
};

module.exports = auth;