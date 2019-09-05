const apiRouter = require('express').Router();

const endpointJSON = require('../endpoints.json');

apiRouter.get('/', (req, res) => {
  res.status(200).send(endpointJSON);
});

module.exports = apiRouter;
