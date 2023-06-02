const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Province = new Schema({
    _id: String,
    name: {
        type: String,
        required: [true, "Giá trị không được trống!"],
    },
});
module.exports = mongoose.model("Province", Province);
