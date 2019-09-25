const userRouter = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  postNewUser,
  getUserLines
} = require('../controllers/usersController');

userRouter
  .route('/')
  .get(getAllUsers)
  .post(postNewUser);

userRouter.route('/:user_id').get(getSingleUser);

userRouter.route('/:user_id/lines').get(getUserLines);

module.exports = userRouter;
