const SavePost = require("../models/SavePost");
const { RealHome } = require("../models/realHome");

const get = async (req, res) => {
    const id = req.userId;
    try {
        const saved_post = await SavePost.find({ user_id: id }).sort({
            createdAt: -1,
        });

        if (saved_post.length > 0) {
            return res.status(200).json({
                success: true,
                data: saved_post,
                total_post: saved_post.length,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Không có bài đăng nào được lưu.",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Không có bài đăng nào được lưu.",
        });
    }
};

const create = async (req, res) => {
    const { real_home_id } = req.body;
    const id = req.userId;
    try {
        let real_home = await RealHome.findOne({ _id: real_home_id });
        if (real_home) {
            let saved_post = await SavePost.create({
                user_id: id,
                real_home,
            });
            saved_post.save();
            return res.status(201).json({
                success: true,
                message: `Lưu tin.`,
            });
        } else {
            return res
                .status(200)
                .json({ success: false, message: "Không tìm thấy bài đăng!" });
        }
    } catch (error) {
        return res
            .status(200)
            .json({ success: false, message: "Lưu tin không thành công!" });
    }
};

const drop = async (req, res) => {
    const { real_home_id } = req.query;
    const id = req.userId;
    try {
        await SavePost.findOneAndDelete({
            user_id: id,
            "real_home._id": real_home_id,
        });
        return res.status(201).json({
            success: true,
            message: "Xóa lưu tin.",
        });
    } catch (error) {
        return res
            .status(200)
            .json({ success: false, message: "Xóa lưu tin không thành công!" });
    }
};

const savePostController = {
    get,
    create,
    drop,
};
module.exports = savePostController;
