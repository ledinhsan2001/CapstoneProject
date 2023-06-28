const express = require("express");
const {
    getAll,
    create,
    drop,
    getDetail,
    put,
    putStatus,
    putStatusFalse,
    putStatusTrue,
} = require("../controllers/blogController");
const authJwt = require("../middlewares/authJWT");

const blogRouter = express.Router();

blogRouter.get("/detail", getDetail);
blogRouter.get("/all", getAll);
blogRouter.post("/create", [authJwt.verifyToken, authJwt.isAdmin], create);
blogRouter.put("/put/:_id", [authJwt.verifyToken, authJwt.isAdmin], put);
blogRouter.put("/put-status-false/:_id", putStatusFalse);
blogRouter.put("/put-status-true/:_id", putStatusTrue);
blogRouter.delete("/drop", [authJwt.verifyToken, authJwt.isAdmin], drop);

module.exports = blogRouter;
