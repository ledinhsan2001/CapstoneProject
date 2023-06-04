const express = require("express");
const { getUser, putUser } = require("../controllers/userController");
import authJwt from "../middlewares/authJWT";

const userRouter = express.Router();

userRouter.get("/detail", [authJwt.verifyToken], getUser);
userRouter.put("/put", [authJwt.verifyToken], putUser);

module.exports = userRouter;
