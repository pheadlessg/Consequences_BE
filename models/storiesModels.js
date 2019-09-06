const db = require('../db/connection');

module.exports = {
  fetchAllStories() {
    return db('stories')
      .select()
      .join('users', 'stories.created_by', '=', 'users.user_id')
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
  },
  fetchSingleStory(params) {
    return db('stories')
      .select()
      .join('users', 'stories.created_by', '=', 'users.user_id')
      .where({ story_id: params.story_id });
  },
  removeStory(params) {
    return db('stories')
      .where({ story_id: params.story_id })
      .del();
  }
};
