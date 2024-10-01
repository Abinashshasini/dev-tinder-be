const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  emailId: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  bio: {
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);
