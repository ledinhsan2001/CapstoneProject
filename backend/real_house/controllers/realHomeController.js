import moment from "moment";
import "moment/locale/vi";
const catchAsync = require("../middlewares/catchAsync");
const { Description } = require("../models/description");
const { Image } = require("../models/image");
const RealHome = require("../models/realHome");
const realHomeType = require("../models/realHomeType");
const { TransactionType } = require("../models/transactionType");
const { User } = require("../models/user");
const ApiError = require("../utils/ApiError");
const { FormatDate } = require("../utils/FormatDate");
require("dotenv").config();

export const getDetail = catchAsync(async (req, res) => {
    const { id } = req.body;
    const real_home = await RealHome.find({ _id: id }, { __v: 0 });
    if (real_home) {
        const RHT = await realHomeType.findOne(
            {
                _id: real_home[0].real_home_type_id,
            },
            { _id: 1, name: 1, transaction_type: 1 }
        );
        real_home[0].real_home_type_id = RHT;
        res.status(200).json({ success: true, data: real_home });
    }
});

export const getNewPost = catchAsync(async (req, res) => {
    const typeRHs = await RealHome.find(
        {},
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
        }
    )
        .sort({ createdAt: -1 })
        .limit(5);

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

export const getAllByUser = catchAsync(async (req, res) => {
    const { page } = req.query;
    const user_id = req.userId;

    const results = {};
    let page_number = parseInt(page);
    let limit = process.env.LIMIT;
    let typeRHs = await RealHome.find(
        { "user_post._id": user_id },
        { __v: 0 }
    ).sort({ start_date: 1 });
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
        if (startIndex > 0) {
            results.previous = {
                page: page_number - 1,
            };
        }
        if (lastIndex < typeRHs.length) {
            results.next = {
                page: page_number + 1,
            };
        }
        results.total_data = typeRHs.length;
        results.page_count = Math.ceil(typeRHs.length / limit);
        res.status(200).json({ success: true, data: results });
    } else {
        return res
            .status(400)
            .json({ message: "Danh sách bất động sản trống." });
        // throw new ApiError(400, "Danh sách kiểu bất động sản trống.");
    }
});

export const getAllLimit = catchAsync(async (req, res) => {
    const { page, transaction_type_id, real_home_type_id, price_id, area_id } =
        req.query;

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

    let page_number = parseInt(page);
    let limit = process.env.LIMIT;
    const results = {};
    let typeRHs;

    let clause_where = {};
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

    // console.log(clause_where);
    typeRHs = await RealHome.find(clause_where, { __v: 0 });

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
        if (startIndex > 0) {
            results.previous = {
                page: page_number - 1,
            };
        }
        if (lastIndex < typeRHs.length) {
            results.next = {
                page: page_number + 1,
            };
        }
        results.total_data = typeRHs.length;
        results.page_count = Math.ceil(typeRHs.length / limit);
        res.status(200).json({ success: true, data: results });
    } else {
        return res
            .status(400)
            .json({ message: "Danh sách bất động sản trống." });
        // throw new ApiError(400, "Danh sách kiểu bất động sản trống.");
    }
});

export const getAll = async (req, res) => {
    const typeRHs = await RealHome.find({}, { __v: 0 });
    if (typeRHs.length) {
        res.status(200).json({ success: true, data: data });
    } else {
        throw new ApiError(400, "Danh sách kiểu bất động sản trống.");
    }
};

export const create = async (req, res) => {
    const {
        user_post,
        address,
        images,
        real_home_type_id,
        transaction_type_id,
        description,
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

    const short_des = `Anh/Chị ${nameExist.first_name} ${nameExist.last_name}. SĐT: ${nameExist.phone}. ${transaction_type_name.name} ${address} Giá: ${description.price}, diện tích: ${description.area}`;
    description.short_description = short_des;

    try {
        const obj_description = await Description.create({
            title_description: description.title_description,
            short_description: description.short_description,
            content_description: description.content_description,
            price: description.price,
            area: description.area,
            bedroom: description.bedroom,
            toilet: description.toilet,
        });
        let start_date = FormatDate();

        //then integrated payment will change enddate
        let end_date = FormatDate(7);
        const real_home = await RealHome.create({
            user_post: nameExist,
            address,
            start_date,
            end_date,
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
                message: "Tạo mới bất động sản thành công",
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
    const { id } = req.params;
    const { name, transaction_type_id } = req.body;
    const transType = await transactionType.findOne({
        _id: transaction_type_id,
    });
    if (transType) {
        const typeOfRH = await typeOfRealHouse.findByIdAndUpdate(
            id,
            { name: name, transaction_type: transType.id },
            { new: true }
        );
        if (typeOfRH) {
            typeOfRH.__v = undefined;
            res.status(201).json({
                success: true,
                message: "Update kiểu bất động sản thành công",
                data: typeOfRH,
            });
        } else {
            throw new ApiError(400, "lỗi tạo kiểu bất động sản!");
        }
    }
});

export const drop = catchAsync(async (req, res) => {
    const { id } = req.params;
    const torh = await typeOfRealHouse.findByIdAndDelete({ _id: id });
    if (torh) {
        torh.__v = undefined;
        res.status(201).json({
            success: true,
            message: "Delete kiểu bất động sản thành công",
            data: torh,
        });
    }
});
