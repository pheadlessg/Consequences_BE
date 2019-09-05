const apiRouter = require('express').Router();
const storyRouter = require('./storyRouter');

const endpointJSON = require('../endpoints.json');

apiRouter.get('/', (req, res) => {
  res.status(200).send(endpointJSON);
});
apiRouter.use('/stories', storyRouter);

module.exports = apiRouter;
