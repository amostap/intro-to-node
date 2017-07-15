const express = require('express');
const apiController = require('../controllers/apiController')();

const apiRouter = express.Router();

const router = () => {
  apiRouter.route('/practices')
    .get(apiController.getPractices);

  apiRouter.route('/practices/:practiceId')
    .get(apiController.getPracticesById);

  apiRouter.route('/practices/:practiceId/technologies')
    .get(apiController.getTechnologies);

  apiRouter.route('/practices/:practiceId/technologies/:technologyId')
    .get(apiController.getTechnologiesById);

  return apiRouter;
};

module.exports = router;
