const test = require('./test');
const development = require('./dev');

const env = process.env.NODE_ENV || 'development';

const data = { test, development };

module.exports = data[env];
