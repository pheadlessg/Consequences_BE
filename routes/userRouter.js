const userRouter = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  postNewUser,
  deleteUser,
  getUserLines
} = require('../controllers/usersController');

userRouter.route('/').get(getAllUsers);
//   .post(postNewUser)
//   .delete(deleteUser)

module.exports = userRouter;
