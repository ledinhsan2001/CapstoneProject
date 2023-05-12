// const catchAsync = require("../middlewares/catchAsync");
// const RealHome = require("../models/realHome");
// const ApiError = require("../utils/ApiError");

// const getDetailRH = catchAsync(async (req, res) => {
//     const { id } = req.body;
//     const typeRH = await RealHome.find({ _id: id });
//     if (typeRH) {
//         typeRH[0].__v = undefined;
//         res.status(200).json({ success: true, data: typeRH });
//     }
// });

// const getAllRH = catchAsync(async (req, res) => {
//     const typeRHs = await RealHome.find();
//     if (typeRHs.length) {
//         typeRHs.map((data) => {
//             data.__v = undefined;
//         });
//         res.status(200).json({ success: true, data: typeRHs });
//     } else {
//         throw new ApiError(400, "Danh sách kiểu bất động sản trống.");
//     }
// });

// const addTypeOfRealHouse = catchAsync(async (req, res) => {
//     const { name, transaction_type_id } = req.body;
//     const nameExist = await RealHome.findOne({ name: name });
//     if (!nameExist) {
//         const transType = await transactionType.findOne({
//             _id: transaction_type_id,
//         });
//         if (transType) {
//             const typeOfRH = await new RealHome({
//                 name: name,
//                 transaction_type_id: transType.id,
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
// });

// const putTypeOfRealHouse = catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const { name, transaction_type_id } = req.body;
//     const transType = await transactionType.findOne({
//         _id: transaction_type_id,
//     });
//     if (transType) {
//         const typeOfRH = await typeOfRealHouse.findByIdAndUpdate(
//             id,
//             { name: name, transaction_type: transType.id },
//             { new: true }
//         );
//         if (typeOfRH) {
//             typeOfRH.__v = undefined;
//             res.status(201).json({
//                 success: true,
//                 message: "Update kiểu bất động sản thành công",
//                 data: typeOfRH,
//             });
//         } else {
//             throw new ApiError(400, "lỗi tạo kiểu bất động sản!");
//         }
//     }
// });

// const deleteTypeOfRealHouse = catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const torh = await typeOfRealHouse.findByIdAndDelete({ _id: id });
//     if (torh) {
//         torh.__v = undefined;
//         res.status(201).json({
//             success: true,
//             message: "Delete kiểu bất động sản thành công",
//             data: torh,
//         });
//     }
// });

// const typeOfRHController = {
//     getDetailRH,
//     getAllRH,
//     addTypeOfRealHouse,
//     putTypeOfRealHouse,
//     deleteTypeOfRealHouse,
// };
// module.exports = typeOfRHController;
