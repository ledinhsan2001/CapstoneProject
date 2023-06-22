import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { Link } from "react-router-dom";
import { GetNummberFromString, formatUniToString } from "../../utils/constant";
import { TfiFilter } from "react-icons/tfi";

const PaymentHistory = () => {
    const dispatch = useDispatch();
    const [payment_histories, setpayment_histories] = useState([]);
    const { payment_history, message, total_payment } = useSelector(
        (state) => state.user
    );

    useEffect(() => {
        dispatch(actions.actionPayment());
    }, [dispatch]);

    useEffect(() => {
        setpayment_histories(payment_history);
    }, [payment_history]);

    const handleFilter = (value) => {
        console.log(payment_history);
        if (value === 1) {
            // News Special
            let special = payment_history.filter(
                (item) => item?.payment?.news_type?._id === 0
            );
            setpayment_histories(special);
        } else if (value === 2) {
            // News featured
            let featured = payment_history.filter(
                (item) => item?.payment?.news_type?._id === 1
            );
            setpayment_histories(featured);
        } else if (value === 3) {
            // News common
            let common = payment_history.filter(
                (item) => item?.payment?.news_type?._id === 2
            );
            setpayment_histories(common);
        } else {
            setpayment_histories(payment_history);
        }
    };

    const checkIdNewsType = (payment) => {
        if (payment) {
            const news_id_from_pay = payment?.news_type?._id;
            if (news_id_from_pay === 0) {
                return 0;
            }
            if (news_id_from_pay === 1) {
                return 1;
            }
            if (news_id_from_pay === 2) {
                return 2;
            }
        }
    };

    const convertVNDtoUSD = (total_price) => {
        let cal_price = +total_price / 23;
        return Math.floor(cal_price * 100) / 100;
    };

    return (
        <div>
            <div className="px-10 py-2">
                <div className="text-left text-black font-bold text-4xl pb-4">
                    Lịch sử thanh toán
                </div>
                <div className="my-2 flex justify-between items-center">
                    <h6 className="titleh6 text-left">
                        <b>{total_payment}</b> tin bạn đã thanh toán.
                    </h6>
                    <div className=" flex items-center text-left gap-1">
                        <TfiFilter size={16} />
                        <p className="mr-4 text-[18px] font-bold">
                            Lọc tiêu chí:{" "}
                        </p>
                        <select
                            className=" h-[40px] w-[150px] px-2 rounded-xl border-solid border-1 border-black hover:bg-white hover:text-black hover:border-solid hover:border-2 hover:border-blue-300 cursor-pointer"
                            onChange={(e) => handleFilter(+e.target.value)}
                        >
                            <option
                                className="text-gray-500 font-bold"
                                value={0}
                            >
                                Tất cả
                            </option>
                            <option
                                className="text-red-500 font-bold"
                                value={1}
                            >
                                Tin đặc biệt
                            </option>
                            <option
                                className="text-[#ED0CC9] font-bold"
                                value={2}
                            >
                                Tin đặc sắc
                            </option>
                            <option
                                className="text-blue-500 font-bold"
                                value={3}
                            >
                                Tin thường
                            </option>
                        </select>
                    </div>
                </div>
                <table className="table-fixed border-[2px] border-gray-600 border-separate bg-white w-full">
                    <thead className="text-lg bg-gray-500 text-white">
                        <tr>
                            <th className="border-[1px] border-gray-400 w-[8%]">
                                Mã thanh toán
                            </th>
                            <th className="border-[1px] border-gray-400 w-[10%]">
                                Ảnh bài đăng
                            </th>
                            <th className="border-[1px] border-gray-400 w-[20%]">
                                Tiêu đề
                            </th>
                            <th className="border-[1px] border-gray-400 ">
                                Loại tin
                            </th>
                            <th className="border-[1px] border-gray-400 ">
                                Số ngày đăng
                            </th>
                            <th className="border-[1px] border-gray-400 ">
                                Giá thanh toán
                            </th>
                            <th className="border-[1px] border-gray-400 ">
                                Ngày bắt đầu
                            </th>
                            <th className="border-[1px] border-gray-400 ">
                                Ngày hết hạn
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {payment_histories?.length > 0 &&
                            payment_histories?.map((item) => {
                                const item_payment = item?.payment;
                                const description =
                                    item_payment?.real_home?.description;
                                const images = item_payment?.real_home?.images
                                    ?.url
                                    ? JSON.parse(
                                          item_payment?.real_home?.images?.url
                                      )
                                    : [];

                                return (
                                    <tr
                                        key={item_payment._id}
                                        className="w-full h-[80px]"
                                    >
                                        <td className="border-[1px] border-gray-400 font-bold text-ellipsis whitespace-pre-line overflow-hidden">
                                            {`#${GetNummberFromString(
                                                item_payment?._id
                                            )}`}
                                        </td>
                                        <td className="flex border-[1px] border-gray-400 items-center justify-center">
                                            <Link
                                                to={`/chi-tiet/${
                                                    item_payment?.real_home?._id
                                                }/${formatUniToString(
                                                    description?.title_description
                                                )}`}
                                            >
                                                <img
                                                    className=" h-[80px] w-[100%] object-cover rounded-sm "
                                                    src={images[0]}
                                                    alt="img"
                                                ></img>
                                            </Link>
                                        </td>
                                        <td
                                            className={`border-[1px] border-gray-400 max-h-[65px] text-ellipsis text-center text-lg ml-1 items-center whitespace-pre-line overflow-hidden ${
                                                checkIdNewsType(
                                                    item_payment
                                                ) === 0
                                                    ? `text-red-500`
                                                    : checkIdNewsType(
                                                          item_payment
                                                      ) === 1
                                                    ? `text-[#ED0CC9]`
                                                    : "text-blue-700"
                                            } `}
                                        >
                                            <Link
                                                to={`/chi-tiet/${
                                                    item_payment?.real_home?._id
                                                }/${formatUniToString(
                                                    description?.title_description
                                                )}`}
                                            >
                                                {`${description?.title_description.slice(
                                                    0,
                                                    56
                                                )}...`}
                                            </Link>
                                        </td>
                                        <td
                                            className={`border-[1px] border-gray-400 text-[18px] font-bold ${
                                                checkIdNewsType(
                                                    item_payment
                                                ) === 0
                                                    ? `text-red-500`
                                                    : checkIdNewsType(
                                                          item_payment
                                                      ) === 1
                                                    ? `text-[#ED0CC9]`
                                                    : "text-blue-700"
                                            }`}
                                        >
                                            {`Tin ${item_payment?.news_type?.name}`}
                                        </td>
                                        <td className="border-[1px] border-gray-400 text-[16px]">
                                            {`${item_payment?.number_day?.number_day} ngày`}
                                        </td>
                                        <td className="border-[1px] border-gray-400 text-[#16c784] text-[20px] font-bold">
                                            <div className="flex flex-col text-end mx-2">
                                                <p>{`${item_payment?.total_price}.000 VND`}</p>
                                                <p className="text-[16px] text-black">{`${convertVNDtoUSD(
                                                    item_payment?.total_price
                                                )} $`}</p>
                                            </div>
                                        </td>
                                        <td className="border-[1px] border-gray-400">
                                            {item_payment?.start_date}
                                        </td>
                                        <td className="border-[1px] border-gray-400">
                                            {item_payment?.expiration_date}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                {message && <div className="bg-white">{message}</div>}
            </div>
        </div>
    );
};

export default PaymentHistory;
