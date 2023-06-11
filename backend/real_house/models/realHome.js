const mongoose = require("mongoose");
const { Description, DescriptionSchema } = require("./description");
const { Image, ImageSchema } = require("./image");
const { User, UserSchema } = require("./user");

const Schema = mongoose.Schema;
const RealHome = new Schema(
    {
        user_post: UserSchema,
        address: {
            type: String,
            required: [true, "Phải có địa chỉ."],
        },
        sold: {
            type: Boolean,
            default: false,
        },
        start_date: {
            type: String,
            default: "",
        },
        end_date: {
            type: String,
            default: "",
        },
        expired: {
            type: Boolean,
            default: false,
        },
        images: ImageSchema,
        real_home_type_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RealHomeType",
        },
        transaction_type_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TransactionType",
        },
        description: DescriptionSchema,
        price_id: {
            type: mongoose.Schema.Types.String,
            ref: "Price",
        },
        area_id: {
            type: mongoose.Schema.Types.String,
            ref: "Area",
        },
        order_area: {
            type: Number,
        },
        province_id: {
            type: mongoose.Schema.Types.String,
            ref: "Province",
        },
        active: {
            type: Boolean,
            default: false,
        },
    },
    {
        //auto createdAt, updatedAt
        timestamps: true,
    }
);

module.exports = mongoose.model("RealHome", RealHome);
