const {
  fetchAllUsers,
  fetchSingleUser,
  makeUser,
  fetchUserLines
} = require('../models/usersModels');

module.exports = {
  getAllUsers(req, res, next) {
    fetchAllUsers(req.query)
      .then(users => {
        res.status(200).send(users);
      })
      .catch(next);
  },
  getSingleUser(req, res, next) {
    fetchSingleUser(req.params)
      .then(user => {
        res.status(200).send(user[0]);
      })
      .catch(next);
  },
  postNewUser(req, res, next) {
    makeUser(req.body)
      .then(user => {
        const finalUser = {
          user: user[0]
        };
        res.status(201).send(finalUser);
      })
      .catch(next);
  },
  getUserLines(req, res, next) {
    fetchUserLines(req.params)
      .then(lines => {
        res.status(200).send(lines);
      })
      .catch(next);
  }
};
