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
userRouter.route('/:user_id').get(getSingleUser);
//   .delete(deleteUser)
module.exports = userRouter;
