const express = require("express");
const {
    getAllByUser,
    getAllLimit,
    getAll,
    getDetail,
    create,
    put,
    drop,
    getNewPost,
    getAllByUserPublic,
    getAllByUserUnPayment,
} = require("../controllers/realHomeController");
const { verifyToken } = require("../middlewares/authJWT");

const realHomeRouter = express.Router();
realHomeRouter.get("/", getAll);
realHomeRouter.get("/limit", getAllLimit);
realHomeRouter.get("/all-public", getAllByUserPublic);
realHomeRouter.get("/all-by-user", [verifyToken], getAllByUser);
realHomeRouter.get(
    "/all-by-user-unpayment",
    [verifyToken],
    getAllByUserUnPayment
);
realHomeRouter.get("/new-post", getNewPost);
realHomeRouter.get("/detail", getDetail);
realHomeRouter.post("/create", create);
realHomeRouter.put("/put", put);
realHomeRouter.delete("/delete", drop);

module.exports = realHomeRouter;
