const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const NumberDay = new Schema(
    {
        _id: Number,
        number_day:
        {
            type: Number,
            required: [true, "Số ngày không được trống!"]
        },
        saved_price:
        {
            type: Number,
            required: [true, "Yêu cầu giá tiết kiệm!"],
            default: 0
        }
    },
    {
        //auto createdAt, updatedAt
        timestamps:true,
    }
)
module.exports = mongoose.model('NumberDay', NumberDay);
