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
  }
};
