const db = require('../db/connection');

module.exports = {
  fetchAllUsers() {
    return db('users')
      .select()
      .returning('*');
  }
};
