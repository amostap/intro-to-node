/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const apiRouter = require('./src/routes/apiRoutes')();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/api', apiRouter);

app.get('/*', (req, res) => {
  res.sendStatus(404);
});

app.listen(port, (err) => {
  if (err) throw err;

  console.log(`Running server on port: ${port}`);
});
