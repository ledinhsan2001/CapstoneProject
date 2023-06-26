const PaymentHistory = require("../models/paymentHistory");

const getAll = async (req, res) => {
    try {
        const payment_history = await PaymentHistory.find();
        if (payment_history.length > 0) {
            return res.status(200).json({
                success: true,
                data_pay_his: payment_history,
                total_payment_his: payment_history.length,
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

const get = async (req, res) => {
    const id = req.userId;
    try {
        const payment_history = await PaymentHistory.find({
            "payment.user._id": id,
        }).sort({
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

const getAllLimit = async (req, res) => {
    const { page } = req.query;
    let page_number = parseInt(page);
    let limit = process.env.LIMIT;
    let startIndex = page_number * limit;
    let lastIndex = (page_number + 1) * limit;
    const results = {};
    try {
        const payment_history = await PaymentHistory.find().sort({
            createdAt: -1,
        });
        if (payment_history.length > 0) {
            if (lastIndex >= payment_history.length) {
                lastIndex = payment_history.length;
            }
            results.limit_data_pay_his = payment_history.slice(
                startIndex,
                lastIndex
            );
            results.total_all_pay_his = payment_history.length;
            results.page_count_pay_his = Math.ceil(
                payment_history.length / limit
            );
            return res.status(200).json({
                success: true,
                data: results,
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

const paymentHistoryController = {
    getAll,
    get,
    getAllLimit,
};
module.exports = paymentHistoryController;
