const storyRouter = require('express').Router();
const {
  getAllStories,
  getSingleStory,
  postNewStory,
  deleteStory,
  addStoryLine,
  getLines
} = require('../controllers/storiesController');

storyRouter
  .route('/')
  .get(getAllStories)
  .post(postNewStory);

storyRouter
  .route('/:story_id')
  .get(getSingleStory)
  .post(addStoryLine)
  .delete(deleteStory);

storyRouter.route('/:story_id/lines').get(getLines);
module.exports = storyRouter;
