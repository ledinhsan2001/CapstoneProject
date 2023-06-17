const paymentHistory = require("../models/paymentHistory");

const get = async (req, res) => {
    const id = req.userId;
    try {
        const payment_history = await paymentHistory
            .find({ "payment.user._id": id })
            .sort({
                createdAt: -1,
            });

        if (payment_history.length > 0) {
            return res.status(200).json({
                success: true,
                data: payment_history,
                total_payment: payment_history.length,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Chưa có bài nào được thanh toán!",
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Chưa có bài nào được thanh toán!",
        });
    }
};

// const drop = async (req, res) => {
//     const { real_home_id } = req.query;
//     const id = req.userId;
//     try {
//         await SavePost.findOneAndDelete({
//             user_id: id,
//             "real_home._id": real_home_id,
//         });
//         return res.status(201).json({
//             success: true,
//             message: "Xóa lưu tin.",
//         });
//     } catch (error) {
//         return res
//             .status(200)
//             .json({ success: false, message: "Xóa lưu tin không thành công!" });
//     }
// };

const paymentHistoryController = {
    get,
};
module.exports = paymentHistoryController;
