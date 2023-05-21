const express = require("express");
const {
    getAllLimit,
    getAll,
    getDetail,
    create,
    put,
    drop,
    getNewPost,
} = require("../controllers/realHomeController");

const realHomeRouter = express.Router();
realHomeRouter.get("/", getAll);
realHomeRouter.get("/limit", getAllLimit);
realHomeRouter.get("/new-post", getNewPost);
realHomeRouter.get("/detail", getDetail);
realHomeRouter.post("/add", create);
realHomeRouter.put("/put/", put);
realHomeRouter.delete("/delete", drop);

module.exports = realHomeRouter;
