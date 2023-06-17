const mongoose = require("mongoose");
const { PaymentSchema } = require("./payment");

const Schema = mongoose.Schema;
const HistoryPayment = new Schema(
    {
        payment: PaymentSchema,
    },
    {
        //auto createdAt, updatedAt
        timestamps: true,
    }
);
module.exports = mongoose.model("HistoryPayment", HistoryPayment);
