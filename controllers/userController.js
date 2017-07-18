const User = require('../models/user').User;
const mongoose = require('../lib/mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const userController = () => {
  const register = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (user) {
        return res.status(409).send({ message: 'User already exist' });
      } else {
        const newUser = new mongoose.models.User(req.body);
          newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
          newUser.save((err, user) => {
            if (err) {
              return res.status(400).send({ message: err });
          } else {
            const data = {
              email: user.email
            };
            return res.json(data);
          }
        });
      }
    });
  };

  const sigIn = (req, res) => {
    User.findOne({
      email: req.body.email
    }, (err, user) => {
      if (err) {
        throw err;
      }
      if (!user) {
        res.status(401).json({ message: 'Authentication failed. User not found.' });
      } else if (user) {
        if (!user.comparePassword(req.body.password)) {
          res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        } else {
          return res.json({
            token: jwt.sign({
              _id: user._id
            },
            config.get('secret'),
            { expiresIn: 60 * 5 })} // 5min(60s * 5)
          );
        }
      }
    });
  };

  const loginRequired = (req, res, next) => {
    if (req.user) {
      User.findById(req.user._id, (err, user) => {
        if (user) {
          next();
        } else {
          res.status(401).json({ message: 'Unauthorized user!' });
        }
      });
    } else {
      return res.status(401).json({ message: 'Unauthorized user!' });
    }
  };

  return {
    register,
    sigIn,
    loginRequired
  };
};

module.exports = userController;
