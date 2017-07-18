const mongoose = require('../lib/mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  hashPassword: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hashPassword);
};

exports.User = mongoose.model('User', userSchema);
