import React, { memo } from "react";
import { contact } from "../../assets/images/index";
import icons from "../../utils/icons";

const { MdQuestionMark } = icons;
const Contact = ({ max }) => {
    return (
        <div className="mt-5 p-4 w-[100%] flex justify-center ml-[1%]">
            <div
                className={
                    max
                        ? `flex justify-around bg-white w-[100%]`
                        : `flex justify-around bg-white w-[60%]`
                }
            >
                <img
                    src={contact}
                    alt="contact"
                    className="w-[50%] h-auto"
                ></img>
                <div className="flex flex-col items-center pt-4 pr-5">
                    <b>
                        <MdQuestionMark color="red" size={50} />
                    </b>
                    <h1 className="text-3xl">
                        <b>Bạn cần hỗ trợ?</b>
                    </h1>
                    <div className="flex flex-col items-center pt-4">
                        <h1 className="text-xl text-red-600">
                            <b>Vui lòng liên hệ</b>
                        </h1>
                        <p>
                            <b>Số điện thoại: 0326.687.233</b>
                        </p>
                        <p>
                            <b>Zalo: 0326.687.233</b>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Contact);
