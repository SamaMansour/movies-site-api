require('../models/User');
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../config');


module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim()
  };

  return User.findOne({ email: userData.email }, (err, user) => {
    if (err) { return done(err); }

    if (!user) {
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';

      return done(error);
    }

    return user.comparePassword(userData.password, (passwordErr, isMatch) => {
      if (err) { return done(err); }

      if (!isMatch) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }

      const payload = {
        sub: user._id
      };

      const token = jwt.sign(payload, 'F7614F1D2CA5A4370958DAE8178129F7F134A2AA2B4B6EF7241773150F3156C8');
      const data = {
        name: user.name
      };

      return done(null, token, data);
      console.log(token);
    });
  });
});