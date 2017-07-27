const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect(config.get('mongoose:testUri'), { useMongoClient: true });
} else {
  mongoose.connect(config.get('mongoose:uri'), { useMongoClient: true });
}

module.exports = mongoose;
