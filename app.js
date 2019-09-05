const app = require('express')();
const cors = require('cors');
const bodyparser = require('body-parser');
const apiRouter = require('./routes/api');

app.use(cors());
app.use(bodyparser.json());

app.use('/api', apiRouter);

module.exports = app;
