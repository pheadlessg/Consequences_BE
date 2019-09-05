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
  },
  postNewStory(req, res, next) {
    makeStory(req.body)
      .then(story => {
        const finalStory = {
          story: story[0]
        };
        res.status(201).send(finalStory);
      })
      .catch(next);
  }
};
