const bcrypt = require('bcrypt');
const mongoose = require('../lib/mongoose');
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
  }
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hashPassword);
};

exports.User = mongoose.model('User', userSchema);
