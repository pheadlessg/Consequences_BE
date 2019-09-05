const db = require('../db/connection');

module.exports = {
  fetchAllStories() {
    return db('stories')
      .select()
      .returning('*');
  }
};
