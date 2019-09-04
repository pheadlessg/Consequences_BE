exports.up = function(knex) {
  return knex.schema.createTable('stories', stories => {
    stories
      .increments('story_id')
      .primary()
      .notNullable()
      .unsigned();
    stories.string('title').notNullable();
    stories.timestamp('created_at').notNullable();
    stories.integer('created_by').references('users.user_id');
    stories.integer('maxlength').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('lines');
};
