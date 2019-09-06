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
              'story_created_at',
              'story_created_by',
              'maxlength',
              'user_avatar'
            );
            expect(res.body.story_id).to.equal(1);
          }));
      it('POST : SUCCESS will respond with 201 status and the added line', () => {
        const newLine = {
          body: 'This is a new test string belonging to story 1',
          belongs_to: 1,
          created_by: 1
        };
        return request
          .post('/api/stories/1')
          .send(newLine)
          .expect(201)
          .then(res => {
            expect(res.body).to.have.all.keys('line');
            expect(res.body.line).to.have.all.keys(
              'line_id',
              'body',
              'created_at',
              'created_by',
              'belongs_to'
            );
            expect(res.body.line.line_id).to.equal(4);
          });
      });
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
      describe('/lines', () => {
        it('GET : SUCCESS returns 200 and an array of all lines from a single story', () => {
          request
            .get('/api/stories/1/lines')
            .expect(200)
            .then(res => {
              expect(res.body).to.be.an('array');
              expect(res.body.length).to.equal(2);
              expect(res.body[0].username).to.equal('testuser1');
            });
        });
      });
    });
  });
  describe('/users', () => {
    it('GET : SUCCESS returns 200 and an array of all users', () => {
      request
        .get('/api/users/')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(3);
          expect(res.body[0].user_id).to.equal(1);
        });
    });
    describe('/:user_id', () => {
      it('GET : SUCCESS returns 200 and a single user object', () => {
        request
          .get('/api/users/1')
          .expect(200)
          .then(res => {
            expect(res.body.user_id).to.equal(1);
            expect(res.body.username).to.equal('testuser1');
          });
      });
    });
  });
});
