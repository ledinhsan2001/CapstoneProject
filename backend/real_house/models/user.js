const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        first_name: { type: String },
        last_name: { type: String },
        phone: {
            type: String,
            required: [true, "Phải có số điện thoại."],
        },
        password: { type: String },
        avt: {
            type: String,
            default: "",
        },
        address: { type: String, default: "" },
        account_no: {
            type: String,
            default: "",
        },
        dob: {
            type: Date,
            default: Date.now(),
        },
        gender: {
            type: Boolean,
            default: 0,
        },
        saved_news_count: { type: Number, default: 0 },
        link_zalo: { type: String },
        refresh_token: String,
        roles: [
            {
                type: mongoose.Schema.Types.Number,
                ref: "Role",
            },
        ],
    },
    {
        //auto createdAt, updatedAt
        timestamps: true,
    }
);

const User = mongoose.model("User", UserSchema);
module.exports = {
    UserSchema,
    User,
};
