const ENV = process.env.NODE_ENV;
const { userData, storyData, lineData } =
  ENV === 'test' ? require('../data/test/') : require('../data/dev/');

exports.seed = function(knex) {
  return Promise.all([
    knex('users').del(),
    knex('stories').del(),
    knex('lines').del()
  ]).then(() =>
    knex('users')
      .insert(userData)
      .then(() =>
        knex('stories')
          .insert(storyData)
          .then(() => knex('lines').insert(lineData))
      )
  );
};
