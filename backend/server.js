const express = require("express");
const cors = require("cors");
const db = require("./config/connectDB");
require("dotenv").config();
import initRoute from "./real_house/routes";

const app = express();

//connect db
db.connect();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded ==> đọc được body khi client gửi lên
app.use(express.urlencoded({ extended: true }));

// route
app.get("/", (req, res) => {
    res.json({ message: "Homepage!" });
});
// app.get('/api/user', [authJwt.verifyToken] ,(req, res) => {
//     res.json({data: req.userId})
// });
initRoute(app);

// catch error từ các đường dẫn trên

// set port, listen for requests
const port = process.env.PORT || 8888;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
