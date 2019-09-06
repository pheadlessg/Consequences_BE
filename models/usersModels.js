const db = require('../db/connection');

module.exports = {
  fetchAllUsers() {
    return db('users')
      .select()
      .returning('*');
  },
  fetchSingleUser(params) {
    return db('users')
      .select()
      .where({ user_id: params.user_id });
  }
};
