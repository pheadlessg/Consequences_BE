const storyRouter = require('express').Router();
const {
  getAllStories,
  getSingleStory,
  postNewStory,
  deleteStory
} = require('../controllers/storiesController');

storyRouter
  .route('/')
  .get(getAllStories)
  .post(postNewStory);
storyRouter
  .route('/:story_id')
  .get(getSingleStory)
  .delete(deleteStory);

module.exports = storyRouter;
