const express = require("express");
const authJwt = require("../middlewares/authJWT");
const paymentHistoryRouter = express.Router();
const {
    getAll,
    get,
    getAllLimit,
} = require("../controllers/paymentHistoryController");

paymentHistoryRouter.get("/getAll", getAll);
paymentHistoryRouter.get(
    "/getAllLimit",
    [authJwt.verifyToken, authJwt.isAdmin],
    getAllLimit
);
paymentHistoryRouter.get("/get", [authJwt.verifyToken], get);

module.exports = paymentHistoryRouter;
