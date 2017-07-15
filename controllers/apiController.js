const Practice = require('../models/practice').Practice;
const Technology = require('../models/technology').Technology;

const DEFAULT_PAGE = 1;
const DEFAULT_PER = 5;

const apiController = () => {
  const getPractices = (req, res, next) => {
    const select = '-_id -__v';
    Practice.find({}, select, (err, results) => {
      if (err) {
        next(err);
      } else {
        res.send(results);
      }
    });
  };

  const getPracticesById = (req, res, next) => {
    const id = req.params.practiceId;
    const query = { id };
    const select = '-_id -__v';
    Practice.find(query, select, (err, results) => {
      if (err) {
        next(err);
      } else {
        res.send(results);
      }
    });
  };

  const getTechnologies = (req, res, next) => {
    const practiceId = req.params.practiceId;
    const per = +req.query.per || DEFAULT_PER;
    const page = +req.query.page || DEFAULT_PAGE;
    const query = { practice_id: practiceId };
    const select = '-_id -__v';
    const options = {
      select,
      offset: (page - 1) * per,
      limit: per,
    };

    Technology.paginate(query, options, (err, data) => {
      if (err) {
        return next(err);
      }
      if (!data || data.length === 0) {
        res.sendStatus(404);
      } else {
        res.json(data.docs);
      }
    });
  };

  const getTechnologiesById = (req, res, next) => {
    const practiceId = req.params.practiceId;
    const technologyId = req.params.technologyId;
    const query = {
      practice_id: practiceId,
      id: technologyId
    };
    const select = '-_id -__v';

    Technology.find(query, select, (err, data) => {
      if (err) {
        next(err);
      }
      if (!data || data.length === 0) {
        res.sendStatus(404);
      } else {
        res.json(data);
      }
    });
  };

  return {
    getTechnologiesById,
    getTechnologies,
    getPractices,
    getPracticesById,
  };
};

module.exports = apiController;
