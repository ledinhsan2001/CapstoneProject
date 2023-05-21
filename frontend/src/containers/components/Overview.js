import React, { memo } from "react";
import { SellRental, sale, rental, User } from "../../assets/images/index";

const Contact = () => {
    return (
        <div className="p-5 w-[100%] flex items-center justify-center">
            <div className=" flex w-[63%]">
                <img
                    src={SellRental}
                    alt="sellRental"
                    className="h-[300px] w-[450px] mr-[10%] mt-2"
                ></img>

                <div className="flex flex-col items-center ml-2">
                    <h1 className="font-['Merriweather_Bold'] text-2xl">
                        Bán và cho thuê cùng RealHomes
                    </h1>
                    <h4>Nền tảng giao dịch bất động sản hàng đầu Việt Nam</h4>
                    <div className="flex items-center mt-3 cursor-pointer">
                        <div className="flex flex-col m-1 pt-3 items-center bg-white w-[150px] h-[150px]">
                            <img
                                src={User}
                                alt="user"
                                className="h-[50] w-[50px] rounded-[20px]"
                            ></img>
                            <p>50.000+</p>
                            <p>Người dùng</p>
                        </div>
                        <div className="flex flex-col m-1 pt-3 items-center bg-white w-[150px] h-[150px]">
                            <img
                                src={sale}
                                alt="sale"
                                className="h-[50] w-[50px] rounded-[20px]"
                            ></img>
                            <p>137.351+</p>
                            <p>Bất động sản bán</p>
                        </div>
                        <div className="flex flex-col m-1 pt-3 items-center bg-white w-[150px] h-[150px]">
                            <img
                                src={rental}
                                alt="sale"
                                className="h-[50] w-[50px] rounded-[20px]"
                            ></img>
                            <p>26.131+</p>
                            <p className="text-center">Bất động sản cho thuê</p>
                        </div>
                    </div>
                    <button
                        className=" mt-3 bg-blue-500  text-white rounded-4 hover:bg-blue-300 w-[120px] h-[45px] border-[1px] overflow-hidden text-ellipsis whitespace-nowrap"
                        type="button"
                    >
                        Bắt đầu ngay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(Contact);
