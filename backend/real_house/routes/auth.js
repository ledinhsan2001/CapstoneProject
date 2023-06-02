const express = require("express");
const {
    loginController,
    registerController,
    refreshTokenController,
} = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/login", loginController);
authRouter.post("/register", registerController);
authRouter.post("/refresh-token", refreshTokenController);

module.exports = authRouter;
