const {
  fetchAllUsers,
  fetchSingleUser,
  makeUser,
  removeUser,
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
  }
};
