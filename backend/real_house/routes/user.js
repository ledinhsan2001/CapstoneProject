import authJwt from "../middlewares/authJWT";

const express = require("express");
const { getUser, updateUser } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/detail", [authJwt.verifyToken], getUser);
userRouter.post("/update/:id", updateUser);

module.exports = userRouter;
