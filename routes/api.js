const apiRouter = require('express').Router();
const storyRouter = require('./storyRouter');
const userRouter = require('./userRouter');
const endpointJSON = require('../endpoints.json');

apiRouter.get('/', (req, res, next) => {
  res.status(200).send(endpointJSON);
});
apiRouter.use('/stories', storyRouter);
apiRouter.use('/users', userRouter);

module.exports = apiRouter;
