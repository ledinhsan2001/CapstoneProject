import React, { useEffect, useState } from "react";
import { TextAreaDescription, SelectDescription } from "../components";

const Description = ({ payload, setpayload, errors, seterrors }) => {
    const [title_description, settitle_description] = useState("");
    const [content_description, setcontent_description] = useState("");
    const [area, setarea] = useState(0);
    const [bedroom, setbedroom] = useState(0);
    const [toilet, settoilet] = useState(0);
    const [price, setprice] = useState("");
    const [checked, setchecked] = useState(false);
    useEffect(() => {
        if (payload.description.title_description === "") {
            // settitle_description("");
        }
        if (payload.description.content_description === "") {
            // setcontent_description("");
        }
        if (payload.description.price === "") {
            setarea(0);
            setprice("");
            setchecked(false);
            setbedroom(0);
            settoilet(0);
        }
    }, [payload]);

    const isChecked = () => {
        setchecked(!checked);
    };

    useEffect(() => {
        if (checked) {
            setprice("Thỏa thuận");
        }
    }, [checked]);

    useEffect(() => {
        setpayload((prev) => ({
            ...prev,
            description: {
                title_description: title_description.title_description
                    ? title_description.title_description
                    : "",
                short_description: "",
                content_description: content_description.content_description
                    ? content_description.content_description
                    : "",
                price,
                area,
                bedroom,
                toilet,
            },
        }));
    }, [
        title_description,
        content_description,
        area,
        price,
        checked,
        bedroom,
        toilet,
    ]);

    return (
        <div>
            <div className="flex-col bg-white p-3 rounded-md mt-4 w-full">
                <div className="font-bold text-gray-500 py-2 px-3 font-serif text-lg">
                    Thông tin mô tả
                </div>
                <div className="flex-col my-3 px-3 gap-5">
                    <TextAreaDescription
                        title={"Tiêu đề"}
                        obliateTitle="Nhập ít nhất 10 ký tự"
                        placeHolder={
                            "Ví dụ: Chính chủ cần bán nhà số 100 Nguyễn Lương Bằng, Liên Chiểu,10 tỷ."
                        }
                        obligate={"true"}
                        type="title_description"
                        setValue={settitle_description}
                        errors={errors}
                        seterrors={seterrors}
                        name="title_description"
                    />
                </div>
                <div className="flex my-3 px-3">
                    <TextAreaDescription
                        title={"Nội dung mô tả"}
                        obliateTitle="Nhập ít nhất 50 ký tự"
                        placeHolder={
                            "Nhập nội dung mô tả về bất động sản của bạn."
                        }
                        obligate={"true"}
                        type="content_description"
                        setValue={setcontent_description}
                        errors={errors}
                        seterrors={seterrors}
                        name="content_description"
                    />
                </div>
                <div className="flex my-3 px-3 gap-5">
                    <div className="w-[100%] flex flex-col">
                        <SelectDescription
                            title={"Giá bán"}
                            placeHolder={"Nhập giá"}
                            obligate={"true"}
                            type="price"
                            value={price}
                            setValue={setprice}
                            errors={errors}
                            seterrors={seterrors}
                        />
                        <p className="text-sm text-red-500 mt-1">
                            Có dấu cách giữa chữ và số (
                            <b>Ví dụ: 1 tỷ hoặc 1 triệu.</b>)
                        </p>
                        <div className="flex items-center">
                            <input
                                id="thoathuan"
                                type="checkbox"
                                className="mt-3 h-[20px] w-[20px] mr-2 checked:border-none checked:border-[2px] checked:outline-double checked:outline-blue-500"
                                onClick={() => {
                                    isChecked();
                                }}
                            />
                            <label htmlFor="thoathuan" className="mt-3 text-lg">
                                Giá thỏa thuận
                            </label>
                        </div>
                    </div>
                    <SelectDescription
                        title={"Diện tích"}
                        placeHolder={"Nhập diện tích"}
                        obligate={"true"}
                        type="area"
                        value={area}
                        setValue={setarea}
                        errors={errors}
                        seterrors={seterrors}
                    />
                </div>
                <div className="flex my-3 px-3 gap-5">
                    <SelectDescription
                        title={"Số phòng ngủ"}
                        placeHolder={"Nhập số phòng ngủ"}
                        value={bedroom}
                        setValue={setbedroom}
                    />
                    <SelectDescription
                        title={"Số toilet"}
                        placeHolder={"Nhập số toilet"}
                        value={toilet}
                        setValue={settoilet}
                    />
                </div>
            </div>
        </div>
    );
};

export default Description;
