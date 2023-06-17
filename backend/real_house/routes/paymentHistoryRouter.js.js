const express = require("express");
const { get } = require("../controllers/paymentHistoryController");
const authJwt = require("../middlewares/authJWT");

const paymentHistoryRouter = express.Router();

paymentHistoryRouter.get("/get", [authJwt.verifyToken], get);

module.exports = paymentHistoryRouter;
