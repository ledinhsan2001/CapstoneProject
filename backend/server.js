const express = require("express");
const cors = require("cors");
const db = require("./config/connectDB");
require("dotenv").config();
import initRoute from "./real_house/routes";
import { FormatDate } from "./real_house/utils/FormatDate";
import moment from "moment";
import "moment/locale/vi";
const app = express();

// import area from "./real_house/models/area";
// import {
//     price_buysell,
//     price_rental,
//     area_data,
// } from "./real_house/data/price";
// area_data.forEach(async (item, index) => {
//     await new area({
//         _id: item._id,
//         name: item.value,
//         order: index,
//     }).save();
// });
// console.log("done");
//connect db
db.connect();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded ==> đọc được body khi client gửi lên
app.use(express.urlencoded({ extended: true }));

// route
// app.get("/", (req, res) => {
//     res.json({ message: "Homepage!" });
// });
// app.get("/api/user", [authJwt.verifyToken], (req, res) => {
//     res.json({ data: req.userId });
// });

initRoute(app);

// catch error từ các đường dẫn trên

// set port, listen for requests
const port = process.env.PORT || 8888;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
