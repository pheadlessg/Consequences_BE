const app = require('express')();
const cors = require('cors');
const bodyparser = require('body-parser');
const apiRouter = require('./routes/api');
const { handle404 } = require('./errors');

app.use(cors());
app.use(bodyparser.json());

app.use('/api', apiRouter);
app.use('/*', (req, res, next) => {
  next({ status: 404, msg: 'Page not found' });
});

app.use(handle404);

module.exports = app;
