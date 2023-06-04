const { User } = require("../models/user");
const Role = require("../models/role");
const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");

const getUser = catchAsync(async (req, res) => {
    const id = req.userId;
    const user = await User.findById({ _id: id }, { password: 0, __v: 0 });
    if (user) {
        res.status(200).json({ success: true, data: user });
    } else {
        res.status(400).json({ message: "user không tồn tại." });
    }
});

const putUser = async (req, res) => {
    const id = req.userId;
    const payload = req.body;

    //filter drop all value null
    let obj = {};
    let obj_to_arr = Object.entries(payload);
    let arr_not_null = obj_to_arr.filter((item) => item[1] !== "");
    arr_not_null.map((item) => (obj[item[0]] = item[1]));
    try {
        await User.findByIdAndUpdate(id, obj);
        return res.status(200).json({
            success: true,
            message: `Bạn đã cập nhật thông tin thành công`,
        });
    } catch (error) {
        return res
            .status(200)
            .json({ success: false, message: `Lỗi cập nhật thông tin` });
    }
};

const userController = {
    getUser,
    putUser,
};
module.exports = userController;
