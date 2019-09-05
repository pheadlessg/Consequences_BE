const {
  fetchAllStories,
  fetchSingleStory,
  makeStory,
  deleteStory
} = require('../models/storiesModels');

module.exports = {
  getAllStories(req, res, next) {
    fetchAllStories(req.query)
      .then(stories => {
        res.status(200).send(stories);
      })
      .catch(next);
  }
};
