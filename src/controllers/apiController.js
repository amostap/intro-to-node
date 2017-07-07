/* eslint-disable no-console */
const mongodb = require('mongodb').MongoClient;
const URL = require('../config');

const DEFAULT_PAGE = 1;
const DEFAULT_PER = 5;

const apiController = () => {
  const middleware = (req, res, next) => {
    if (!req.headers.token) {
      res.sendStatus(401);
    } else {
      mongodb.connect(URL, (err, db) => {
        const collection = db.collection('tokens');

        collection.findOne({ token: req.headers.token }, (err, results) => {
          if (results) {
            next();
          } else {
            res.sendStatus(401);
          }
        });
      });
    }
  };

  const getPractices = (req, res) => {
    mongodb.connect(URL, (err, db) => {
      const collection = db.collection('practices');

      collection.find({}).toArray((err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send(results);
        }
      });
    });
  };

  const getTokens = (req, res) => {
    mongodb.connect(URL, (err, db) => {
      const collection = db.collection('tokens');

      collection.find({}).toArray((err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send(results.filter(token => token.token));
        }
      });
    });
  };

  const getTechnologies = (req, res) => {
    mongodb.connect(URL, (err, db) => {
      const collection = db.collection('technologies');

      collection.find({}).toArray((err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send(results);
        }
      });
    });
  };

  const getTechnologiesById = (req, res) => {
    const id = +req.params.practiceId;
    const per = +req.query.per || DEFAULT_PER;
    const page = +req.query.page || DEFAULT_PAGE;

    mongodb.connect(URL, (err, db) => {
      const collection = db.collection('technologies');

      collection
        .find({ practice_id: id })
        .skip(per * (page - 1))
        .limit(per)
        .toArray((err, results) => {
          if (err) {
            console.log(err);
          } else {
            res.send(results);
          }
        });
    });
  };

  return {
    getTechnologiesById,
    getTechnologies,
    getPractices,
    getTokens,
    middleware,
  };
};

module.exports = apiController;
