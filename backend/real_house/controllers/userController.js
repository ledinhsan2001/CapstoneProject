const User = require("../models/user");
const Role = require("../models/role");
const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");

const getUser = catchAsync(async (req, res) => {
    const id = req.userId;
    const user = await User.findById({ _id: id });
    if (user) {
        res.status(200).json({ data: user });
    } else {
        throw new ApiError(400, "user không tồn tại.");
    }
});

const updateUser = async (req, res) => {
    const { id } = req.params;
    const {
        first_name,
        last_name,
        phone,
        avt,
        address,
        account_no,
        dob,
        genderm,
        link_zalo,
    } = req.body;
    await User.findByIdAndUpdate(id, {
        first_name,
        last_name,
        phone,
        avt,
        address,
        account_no,
        dob,
        genderm,
        link_zalo,
    });
    res.status(200).json({ message: `Updated user id: ${id} is success` });
};

module.exports = {
    getUser,
    updateUser,
};
