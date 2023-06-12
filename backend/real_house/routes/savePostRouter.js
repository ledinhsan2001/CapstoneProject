const express = require("express");
const { get, create, drop } = require("../controllers/savePostController");
const authJwt = require("../middlewares/authJWT");

const savePostRouter = express.Router();

savePostRouter.get("/", [authJwt.verifyToken], get);
savePostRouter.post("/create", [authJwt.verifyToken], create);
savePostRouter.delete("/delete", [authJwt.verifyToken], drop);

module.exports = savePostRouter;
