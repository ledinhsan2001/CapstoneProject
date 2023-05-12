const express = require('express');
const { getUser, updateUser} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/:id', getUser);
userRouter.post('/update/:id', updateUser);

module.exports = userRouter;