const PassportLocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  process.nextTick(() => {

    const userData = {
      email: email.trim(),
      password: password.trim(),
      displayName: req.body.name.trim()
    };
    
    const newUser = new User(userData);

    newUser.save((err) => {
      if (err) { return done(err); }
      
      return done(null, newUser);
    });
  });
});