const express = require("express");
const {
    get,
    getAll,
    getAllLimit,
} = require("../controllers/paymentHistoryController");
const authJwt = require("../middlewares/authJWT");

const paymentHistoryRouter = express.Router();
//, [authJwt.isAdmin]
paymentHistoryRouter.get("/getAll", getAll);
paymentHistoryRouter.get("/getAllLimit", getAllLimit);
paymentHistoryRouter.get("/get", [authJwt.verifyToken], get);

module.exports = paymentHistoryRouter;
