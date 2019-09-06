exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    users
      .increments('user_id')
      .primary()
      .notNullable()
      .unsigned();
    users
      .string('username')
      .notNullable()
      .unique();
    users.string('avatar_url');
    users.timestamp('created_at').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
