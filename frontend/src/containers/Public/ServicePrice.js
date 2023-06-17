import React from "react";
import {
    service1,
    service2,
    service3,
    service4,
    service5,
    service6,
} from "../../assets/images";
import icons from "../../utils/icons";

const { FaStar } = icons;

const ServicePrice = () => {
    return (
        <div className="flex flex-col">
            <div className="bg-[#254ACC] mx-[10%]">
                <div className="flex p-10 items-center justify-center text-white text-[38px] font-bold relative">
                    <img
                        src={service1}
                        alt="service1"
                        className="absolute left-2 top-2"
                    ></img>
                    <img
                        src={service2}
                        alt="service2"
                        className="absolute left-[15%] bottom-2"
                    ></img>
                    <img
                        src={service3}
                        alt="service3"
                        className="absolute left-[30%] bottom-4"
                    ></img>
                    <img
                        src={service4}
                        alt="service4"
                        className="absolute right-[30%] bottom-6"
                    ></img>
                    <img
                        src={service5}
                        alt="service5"
                        className="absolute right-[15%] bottom-8"
                    ></img>
                    <img
                        src={service6}
                        alt="service6"
                        className="absolute right-[2%] bottom-6"
                    ></img>
                    Bảng giá dịch vụ
                </div>
            </div>
            <div className="bg-white mx-[10%] pt-10">
                <table className="table-fixed w-full">
                    <tbody className="text-2xl">
                        <tr className="text-center mt-2">
                            <td>Loại tin</td>
                            <td>Đơn giá/Ngày</td>
                            <td>Đăng 5 ngày</td>
                            <td>Đăng 10 ngày</td>
                            <td>Đăng 15 ngày</td>
                            <td>Đăng 30 ngày</td>
                            <td>DEMO</td>
                        </tr>
                        <tr className="text-center pt-2 h-[100px]">
                            <td className="text-blue-400">Tin thường</td>
                            <td>1.000 VNĐ</td>
                            <td>5.000 VNĐ</td>
                            <td className="pt-[20px]">
                                9.000 VNĐ
                                <p className="text-sm text-green-400 text-end pr-[10%]">
                                    Tiết kiệm 1.000
                                </p>
                            </td>
                            <td className="pt-[20px]">
                                12.000 VNĐ
                                <p className="text-sm text-green-400 text-end pr-[10%]">
                                    Tiết kiệm 3.000
                                </p>
                            </td>
                            <td className="pt-[20px]">
                                21.000 VNĐ
                                <p className="text-sm text-green-400 text-end pr-[10%]">
                                    Tiết kiệm 9.000
                                </p>
                            </td>
                            <td>
                                <button className="p-2 bg-blue-500 hover:bg-blue-300 cursor-pointer text-white rounded-xl">
                                    Xem Demo
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p className="text-3xl items-center mt-[50px]">
                    Chú thích và minh họa
                </p>
                <div className="bg-[#37D595] mx-20 my-4 flex">
                    <div className="flex flex-col">
                        <div className="text-red-500 text-ellipsis text-left items-center whitespace-pre-line overflow-hidden text-2xl m-4">
                            <FaStar
                                size={30}
                                color="orange"
                                className="inline-block mb-1"
                            />
                            Tin đặc biệt
                        </div>
                        <p className="mx-6 my-2 text-start text-xl text-white">
                            - Hiển thị trên các loại tin khác
                        </p>
                        <p className="mx-6 my-2 text-start text-xl text-white">
                            - Có gắn huy hiệu ở dầu tiêu đề
                        </p>
                        <p className="mx-6 my-2 text-start text-xl text-white">
                            - Có màu sắc riêng
                        </p>
                    </div>
                    <div className="flex"></div>
                </div>
            </div>
        </div>
    );
};

export default ServicePrice;
