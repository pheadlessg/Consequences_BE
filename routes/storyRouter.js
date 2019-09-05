const storyRouter = require('express').Router();
const {
  getAllStories,
  getSingleStory,
  postNewStory,
  deleteStory
} = require('../controllers/storiesController');

storyRouter.route('/').get(getAllStories);

module.exports = storyRouter;
