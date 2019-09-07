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
  },
  makeUser(body) {
    return db('users')
      .insert({
        username: body.username,
        avatar_url: body.avatar_url,
        created_at: 'NOW()'
      })
      .returning('*');
  },
  fetchUserLines(params) {
    return db('lines')
      .select()
      .where({ created_by: params.user_id });
  }
};
