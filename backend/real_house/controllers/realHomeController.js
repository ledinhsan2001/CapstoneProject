import moment from "moment";
import "moment/locale/vi";
import { NewsType } from "../models/newsType";
import { Payment } from "../models/payment";
const catchAsync = require("../middlewares/catchAsync");
const { Description } = require("../models/description");
const { Image } = require("../models/image");
const { RealHome } = require("../models/realHome");
const Area = require("../models/area");
const realHomeType = require("../models/realHomeType");
const { TransactionType } = require("../models/transactionType");
const { User } = require("../models/user");
const ApiError = require("../utils/ApiError");
const { FormatDate } = require("../utils/FormatDate");
require("dotenv").config();

export const getDetail = catchAsync(async (req, res) => {
    const { id } = req.query;
    const real_home = await RealHome.findOne({ _id: id }, { __v: 0 });
    const news_type = await NewsType.findOne({
        _id: real_home.news_type_id,
    });

    if (real_home) {
        return res
            .status(200)
            .json({ success: true, data: real_home, news_type: news_type });
    }
    return res
        .status(400)
        .json({ success: false, message: "Bất động sản không tồn tại!" });
});

export const getNewPost = catchAsync(async (req, res) => {
    const typeRHs = await RealHome.find(
        {
            active: true,
        },
        {
            _id: 1,
            images: {
                url: 1,
            },
            createdAt: 1,
            description: {
                price: 1,
                title_description: 1,
            },
            news_type_id: 1,
        }
    )
        .sort({ createdAt: -1 })
        .limit(7);

    if (typeRHs.length > 0) {
        // const limit_data = page_number * limit;
        // .skip(limit_data)
        // .limit(limit);

        res.status(200).json({ success: true, data: typeRHs });
    } else {
        return res
            .status(400)
            .json({ message: "Danh sách bất động sản trống." });
        // throw new ApiError(400, "Danh sách kiểu bất động sản trống.");
    }
});

export const getAllByUserPublic = async (req, res) => {
    const { _id } = req.query;
    let typeRHs = await RealHome.find(
        { "user_post._id": _id },
        { __v: 0 }
    ).sort({ start_date: -1 });
    if (typeRHs.length > 0) {
        return res.status(200).json({
            success: true,
            data: typeRHs,
            total_post_by_user: typeRHs.length,
        });
    } else {
        return res.status(400).json({
            success: false,
            message: "Không có tin bất động sản nào.",
        });
    }
};

export const getAllByUser = catchAsync(async (req, res) => {
    const user_id = req.userId;

    const results = {};
    let typeRHs = await RealHome.find(
        { "user_post._id": user_id },
        { __v: 0 }
    ).sort({ start_date: -1 });
    let payment = await Payment.find({ "user._id": user_id });

    if (typeRHs.length > 0) {
        results.data = typeRHs;
        results.total_data = typeRHs.length;
        results.payment = payment;
        res.status(200).json({ success: true, data: results });
    } else {
        return res
            .status(400)
            .json({ message: "Danh sách bất động sản trống." });
        // throw new ApiError(400, "Danh sách kiểu bất động sản trống.");
    }
});

export const getAllByUserUnPayment = catchAsync(async (req, res) => {
    const user_id = req.userId;

    const results = {};
    let typeRHs = await RealHome.find(
        { active: false, "user_post._id": user_id },
        { __v: 0 }
    ).sort({ start_date: -1 });

    if (typeRHs.length > 0) {
        results.data = typeRHs;
        results.total_data = typeRHs.length;
        res.status(200).json({ success: true, data: results });
    } else {
        return res
            .status(400)
            .json({ message: "Danh sách bất động sản trống." });
        // throw new ApiError(400, "Danh sách kiểu bất động sản trống.");
    }
});

export const getAllLimit = catchAsync(async (req, res) => {
    const {
        page,
        transaction_type_id,
        real_home_type_id,
        price_id,
        area_id,
        sort_id,
        news_type_id,
    } = req.query;

    //search is format arr[[1,2,3]] = object
    let arr_price;
    let arr_area;
    arr_price =
        typeof price_id === "object"
            ? (arr_price = price_id[0])
            : (arr_price = [price_id]);
    arr_area =
        typeof area_id === "object"
            ? (arr_area = area_id[0])
            : (arr_area = [area_id]);

    let sort = sort_id;
    let objsort = {};
    // sort follow news_type everytime
    objsort["news_type_id"] = 1;
    if (sort) {
        if (+sort === 0) {
            objsort["createdAt"] = 1;
        }
        if (+sort === 1) {
            objsort["createdAt"] = -1;
        }
        if (+sort === 2) {
            objsort["description.area"] = 1;
        }
        if (+sort === 3) {
            objsort["description.area"] = -1;
        }
    }

    let page_number = parseInt(page);
    let limit = process.env.LIMIT;
    const results = {};

    let clause_where = {};
    // posts paymented
    clause_where["active"] = true;
    if (transaction_type_id) {
        clause_where["transaction_type_id"] = transaction_type_id;
    }
    if (real_home_type_id) {
        clause_where["real_home_type_id"] = real_home_type_id;
    }
    if (price_id) {
        clause_where["price_id"] = { $in: arr_price };
    }
    if (area_id) {
        clause_where["arr_area"] = { $in: arr_area };
    }
    if (news_type_id) {
        clause_where["news_type_id"] = +news_type_id;
    }

    const typeRHs = await RealHome.find(clause_where, { __v: 0 }).sort(objsort);

    // const limit_data = page_number * limit;
    // .skip(limit_data)
    // .limit(limit);

    let startIndex = page_number * limit;
    let lastIndex = (page_number + 1) * limit;
    if (typeRHs.length > 0) {
        if (lastIndex >= typeRHs.length) {
            lastIndex = typeRHs.length;
        }
        results.data = typeRHs.slice(startIndex, lastIndex);
        results.total_data = typeRHs.length;
        results.page_count = Math.ceil(typeRHs.length / limit);
        res.status(200).json({ success: true, data: results });
    } else {
        return res
            .status(400)
            .json({ message: "Danh sách bất động sản trống." });
    }
});

export const getAll = async (req, res) => {
    const typeRHs = await RealHome.find().sort({ createdAt: -1 });
    // ([{
    //     $lookup: {
    //         from: "Area",
    //         localField: "area_id",
    //         foreignField: "_id",
    //         as: "area_order",
    //     },
    // },
    // {
    //     $sort: {
    //         "description.area": 1,
    //     },
    // },
    // {
    //     $group: {
    //         _id: "$area_id",
    //     },
    // },
    // { $unwind: "$RealHome" },
    // ]);
    if (typeRHs.length) {
        return res.status(200).json({
            success: true,
            data: typeRHs,
            total_all_data: typeRHs.length,
        });
    } else {
        return res.status(400).json({
            success: false,
            message: "Danh sách kiểu bất động sản trống.",
        });
    }
};

export const create = async (req, res) => {
    const {
        user_post,
        address,
        images,
        real_home_type_id,
        transaction_type_id,
        title_description,
        content_description,
        price,
        area,
        bedroom,
        toilet,
        price_id,
        area_id,
        province_id,
    } = req.body;
    const nameExist = await User.findOne({ _id: user_post });
    const obj_images = await Image.create({
        url: JSON.stringify(images.url),
    });

    const transaction_type_name = await TransactionType.findOne({
        _id: transaction_type_id,
    });

    const short_des = `Anh/Chị ${nameExist.first_name} ${nameExist.last_name}. SĐT: ${nameExist.phone}. ${transaction_type_name.name} ${address} Giá: ${price} VND, diện tích: ${area} m2`;

    try {
        const obj_description = await Description.create({
            title_description,
            short_description: short_des,
            content_description,
            price,
            area: +area,
            bedroom,
            toilet,
        });

        let start_date = FormatDate();
        const real_home = await RealHome.create({
            user_post: nameExist,
            address,
            start_date,
            images: obj_images,
            real_home_type_id,
            transaction_type_id,
            description: obj_description,
            price_id,
            area_id,
            province_id,
        });

        real_home.save();

        if (real_home) {
            res.status(201).json({
                success: true,
                message: "Bạn đã tạo mới bất động sản thành công",
                data: real_home,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Tạo mới bất động sản không thành công!",
            });
            // throw new ApiError(400, "Tên này đã tồn tại!");
        }
    } catch (error) {
        const errors = error.errors;
        let errMessage;
        const errObj = {};
        if (error.name === "ValidationError") {
            const keys = Object.keys(errors);
            keys.map((key) => {
                errObj[key] = errors[key].message;
            });
            errMessage = errObj;
        }
        return res.status(500).json({
            success: false,
            message: errMessage || "Internal error!",
        });
    }
};

export const put = catchAsync(async (req, res) => {
    const {
        user_post,
        address,
        images,
        real_home_type_id,
        transaction_type_id,
        title_description,
        content_description,
        price,
        area,
        bedroom,
        toilet,
        price_id,
        area_id,
        province_id,
        description_id,
        images_id,
        real_home_id,
    } = req.body;
    const nameExist = await User.findOne({ _id: user_post });
    let obj_images = await Image.findOneAndUpdate(
        { _id: images_id },
        {
            url: JSON.stringify(images.url),
        }
    );
    // id img not exist then create new images
    if (!obj_images) {
        obj_images = await Image.create({
            url: JSON.stringify(images.url),
        });
    }

    const transaction_type_name = await TransactionType.findOne({
        _id: transaction_type_id,
    });

    const short_description = `Anh/Chị ${nameExist.first_name} ${nameExist.last_name}. SĐT: ${nameExist.phone}. ${transaction_type_name.name} ${address} Giá: ${price}, diện tích: ${area}`;

    try {
        const obj_description = await Description.findOneAndUpdate(
            { _id: description_id },
            {
                title_description,
                short_description,
                content_description,
                price,
                area: +area,
                bedroom,
                toilet,
            }
        );

        const real_home = await RealHome.findOneAndUpdate(
            { _id: real_home_id },
            {
                user_post: nameExist,
                address,
                images: obj_images,
                real_home_type_id,
                transaction_type_id,
                description: obj_description,
                price_id,
                area_id,
                province_id,
            }
        );

        real_home.save();

        if (real_home) {
            res.status(201).json({
                success: true,
                message: "Bạn đã cập nhật bất động sản thành công",
                data: real_home,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Cập nhật bất động sản không thành công!",
            });
        }
    } catch (error) {
        const errors = error.errors;
        let errMessage;
        const errObj = {};
        if (error.name === "ValidationError") {
            const keys = Object.keys(errors);
            keys.map((key) => {
                errObj[key] = errors[key].message;
            });
            errMessage = errObj;
        }
        return res.status(500).json({
            success: false,
            message: errMessage || "Lỗi server!",
        });
    }
});

export const drop = async (req, res) => {
    const { _id, description_id, images_id } = req.body;
    try {
        await Image.findOneAndDelete({ _id: images_id });
        await Description.findOneAndDelete({
            _id: description_id,
        });
        await RealHome.findOneAndDelete({ _id: _id });

        return res.status(200).json({
            success: true,
            message: "Bạn đã xóa bất động sản thành công!",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Xóa bất động sản không thành công!",
        });
    }
};
