exports.up = function(knex) {
  return knex.schema.createTable('lines', lines => {
    lines
      .increments('line_id')
      .primary()
      .notNullable()
      .unsigned();
    lines.string('body').notNullable();
    lines.timestamp('created_at').notNullable();
    lines.integer('created_by').references('users.user_id');
    lines.integer('belongs_to').references('stories.story_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('lines');
};
