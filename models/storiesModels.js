const db = require('../db/connection');

module.exports = {
  fetchAllStories() {
    return db('stories')
      .select()
      .returning('*');
  },
  makeStory(body) {
    return db('stories')
      .insert({
        title: body.title,
        created_by: body.created_by,
        created_at: 'NOW()',
        maxlength: body.maxlength
      })
      .returning('*');
  }
};
