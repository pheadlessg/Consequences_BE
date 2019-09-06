const {
  fetchAllStories,
  fetchSingleStory,
  makeStory,
  makeNewLine,
  removeStory,
  fetchLines
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
  },

  getSingleStory(req, res, next) {
    fetchSingleStory(req.params)
      .then(story => {
        res.status(200).send(story[0]);
      })
      .catch(next);
  },

  addStoryLine(req, res, next) {
    makeNewLine(req.params, req.body)
      .then(line => {
        const finalLine = {
          line: line[0]
        };
        res.status(201).send(finalLine);
      })
      .catch(next);
  },

  deleteStory(req, res, next) {
    removeStory(req.params)
      .then(res.status(204).send('Deleted'))
      .catch(next);
  },

  getLines(req, res, next) {
    fetchLines(req.params)
      .then(lines => {
        res.status(200).send(lines);
      })
      .catch(next);
  }
};
