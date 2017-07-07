/* eslint-disable no-console */
const express = require('express');
const apiController = require('../controllers/apiController')();

const apiRouter = express.Router();

const router = () => {
  apiRouter.route('/tokens')
    .get(apiController.getTokens);

  apiRouter.use(apiController.middleware);
  // next routes using middleware ^ for check tokens
  apiRouter.route('/practices')
    .get(apiController.getPractices);

  // apiRouter.route('/technologies')
  //   .get(apiController.getTechnologies);

  apiRouter.route('/technologies/:practiceId')
    .get(apiController.getTechnologiesById);

  return apiRouter;
};

module.exports = router;
