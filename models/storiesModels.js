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
      .select(
        'story_id',
        'title',
        'stories.created_at as story_created_at',
        'users.username as story_created_by',
        'users.avatar_url as user_avatar',
        'maxlength'
      )
      .join('users', 'stories.created_by', '=', 'users.user_id')
      .where({ story_id: params.story_id });
  },
  makeNewLine(params, body) {
    return db('lines')
      .insert({
        body: body.body,
        belongs_to: params.story_id,
        created_by: body.created_by,
        created_at: 'NOW()'
      })
      .returning('*');
  },
  removeStory(params) {
    return db('stories')
      .where({ story_id: params.story_id })
      .del();
  },

  fetchLines(params) {
    return db('lines')
      .select('body', 'lines.created_at', 'users.username as username')
      .join('users', 'lines.created_by', '=', 'users.user_id')
      .where({ belongs_to: params.story_id });
  }
};
