const express = require("express");
const {
    getUser,
    putUser,
    getUserPublic,
} = require("../controllers/userController");
import authJwt from "../middlewares/authJWT";

const userRouter = express.Router();

userRouter.get("/detail-public", getUserPublic);
userRouter.get("/detail", [authJwt.verifyToken], getUser);
userRouter.put("/put", [authJwt.verifyToken], putUser);

module.exports = userRouter;
