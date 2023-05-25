const catchAsync = require("../middlewares/catchAsync");
const RealHome = require("../models/realHome");
const realHomeType = require("../models/realHomeType");
const ApiError = require("../utils/ApiError");
require("dotenv").config();

const getDetail = catchAsync(async (req, res) => {
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

const getNewPost = catchAsync(async (req, res) => {
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

const getAllLimit = catchAsync(async (req, res) => {
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

    // if (!page_number) {
    //     page_number = 0;
    // }

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

const getAll = catchAsync(async (req, res) => {
    const typeRHs = await RealHome.find({}, { __v: 0 });
    if (typeRHs.length) {
        res.status(200).json({ success: true, data: data });
    } else {
        throw new ApiError(400, "Danh sách kiểu bất động sản trống.");
    }
});

const create = catchAsync(async (req, res) => {
    //     const { name, transaction_type_id } = req.body;
    //     const nameExist = await RealHome.findOne({ name: name });
    //     if (!nameExist) {
    //         const RHT = await realHomeType.findOne({
    //             _id: nameExist[0].real_home_type_id,
    //         });
    //         if (RHT) {
    //             const typeOfRH = await new RealHome({
    //                 name: name,
    //                 transaction_type_id: RHT.id,
    //             }).save();
    //             if (typeOfRH) {
    //                 res.status(201).json({
    //                     success: true,
    //                     message: "Create kiểu bất động sản thành công",
    //                     data: typeOfRH,
    //                 });
    //             } else {
    //                 throw new ApiError(400, "lỗi tạo kiểu bất động sản!");
    //             }
    //         }
    //     } else {
    //         throw new ApiError(400, "Tên này đã tồn tại!");
    //     }
});

const put = catchAsync(async (req, res) => {
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

const drop = catchAsync(async (req, res) => {
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

const typeOfRHController = {
    getAllLimit,
    getNewPost,
    getAll,
    getDetail,
    create,
    put,
    drop,
};
module.exports = typeOfRHController;
