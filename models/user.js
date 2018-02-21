const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
  email: String, 
  password: String,
  displayName: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;