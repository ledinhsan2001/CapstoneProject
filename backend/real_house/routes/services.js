const express = require('express');


const serviceRouter = express.Router();
serviceRouter.get('/');

module.exports = serviceRouter;