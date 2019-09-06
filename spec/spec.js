process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const app = require('../app');
const connection = require('../db/connection');
const request = require('supertest')(app);

describe('/api', () => {
  beforeEach(() =>
    connection.migrate
      .rollback()
      .then(() => connection.migrate.latest())
      .then(() => connection.seed.run())
  );
  after(() => connection.destroy());
  describe('/', () => {
    it('GET : SUCCESS responds with 200 and JSON describing all available endpoints on the API', () =>
      request
        .get('/api/')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys(
            'stories',
            'single_story',
            'lines',
            'single_line',
            'users',
            'single_user'
          );
        }));
  });
  describe('/stories/', () => {
    it('GET : SUCCESS responds with 200 and an array of all stories', () =>
      request
        .get('/api/stories/')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(3);
          expect(res.body[0]).to.have.all.keys(
            'story_id',
            'title',
            'created_at',
            'created_by',
            'maxlength',
            'user_id',
            'avatar_url',
            'username'
          );
        }));
    it('POST : SUCCESS responds with 201 and the created story', () => {
      const newStory = {
        title: 'This is test story 4',
        created_by: 2,
        maxlength: 50
      };
      return request
        .post('/api/stories/')
        .send(newStory)
        .expect(201)
        .then(res => {
          expect(res.body).to.have.all.keys('story');
          expect(res.body.story.title).to.equal('This is test story 4');
          expect(res.body.story.created_by).to.equal(2);
          expect(res.body.story.story_id).to.equal(4);
        });
    });
    describe('/:story_id', () => {
      it('GET : SUCCESS responds with 200 and an individual story when passed a parametric endpoint', () =>
        request
          .get('/api/stories/1')
          .expect(200)
          .then(res => {
            expect(res.body).to.have.all.keys(
              'story_id',
              'title',
              'created_at',
              'created_by',
              'maxlength',
              'user_id',
              'avatar_url',
              'username'
            );
            expect(res.body.story_id).to.equal(1);
          }));
      it('DELETE : SUCCESS will respond with 204 on successful deletion', () => {
        request
          .delete('/api/stories/1')
          .expect(204)
          .then(() =>
            request.get('/api/stories/').then(res => {
              expect(res.body.length).to.equal(2);
              expect(res.body[0].story_id).to.equal(2);
            })
          );
      });
    });
  });
});
