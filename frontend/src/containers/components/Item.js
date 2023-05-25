import React, { memo, useState } from "react";
import "./Item.css";
import icons from "../../utils/icons";
import { formatUniToString } from "../../utils/constant";
import { Link } from "react-router-dom";

const {
    FaStar,
    FaVectorSquare,
    MdOutlineBed,
    FaToilet,
    MdOutlineLocationOn,
    ImPhone,
    BsImages,
    RiHeartFill,
} = icons;

const Item = ({
    images,
    shortDescription,
    price,
    area,
    bedroom,
    toilet,
    address,
    content,
    user,
    _id,
}) => {
    const data = address.split(",");
    let Address;
    if (data.length === 4) {
        Address = data[2] + "," + data[3];
    }
    if (data.length === 3) {
        Address = data[1] + "," + data[2];
    }
    const [isHoverHeart, setIsHoverHeart] = useState(false);
    return (
        <div className="flex w-[100%] border-t-[2px] border-solid border-orange-400 pt-[10px] pb-[20px] bg-white">
            <div className="flex w-[40%] float-left h-[310px] whitespace-pre-wrap relative cursor-pointer pr-2">
                <img
                    className="object-fit-cover"
                    src={images[0]}
                    alt="preview"
                    width={"100%"}
                    height={"100%"}
                />
                <span className="content-img px-2 flex items-center">
                    <BsImages className="mr-1" />
                    {`${images.length} ảnh`}
                </span>
                <span
                    className="img-heart d-flex"
                    onMouseEnter={() => setIsHoverHeart(true)}
                    onMouseLeave={() => setIsHoverHeart(false)}
                >
                    {isHoverHeart ? (
                        <RiHeartFill size={28} color="red" />
                    ) : (
                        <RiHeartFill size={28} />
                    )}
                </span>
            </div>
            <div className="w-[60%]">
                <Link
                    to={`/chi-tiet/${formatUniToString(
                        shortDescription
                    )}/${_id}`}
                    className="pt-2"
                >
                    <div className="short-des text-red-500 max-h-[65px] text-ellipsis text-left ml-1 items-center whitespace-pre-line overflow-hidden">
                        <FaStar
                            size={30}
                            color="orange"
                            className="inline-block mb-1"
                        />
                        {shortDescription}
                    </div>
                </Link>
                <div className="price justify-around flex pt-1 items-center whitespace-pre-line overflow-hidden">
                    <span className="text-[#16c784] text-[20px] font-bold">
                        {price}
                    </span>
                    <span className="area flex">
                        <FaVectorSquare className="m-1" />
                        {area} m<sup className="pt-[5px]">2</sup>
                    </span>
                    <span className="bedroom flex">
                        <MdOutlineBed className="m-1" />
                        {bedroom} pn
                    </span>
                    <span className="wc flex">
                        <FaToilet className="m-1" />
                        {toilet} wc
                    </span>
                </div>
                <div className="">
                    <div className="address max-h-[60px] text-ellipsis text-left items-center text-[15px]  whitespace-pre-line overflow-hidden ml-2">
                        <MdOutlineLocationOn
                            size={24}
                            className="m-1 inline-block"
                        />
                        {Address}
                    </div>
                </div>
                <p
                    className="content max-h-[100px] mb-3 text-left"
                    style={{
                        paddingLeft: "10px",
                        whiteSpace: "pre-wrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        justifyContent: "flex-start",
                        color: "gray",
                    }}
                >
                    {content}
                </p>
                <div className="contact flex justify-between">
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap flex">
                        <img
                            className="m-2 rounded-[20px] object-cover"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoZinWG8a5dwB2QOpCXxdOcn8G3TSVYkZ7VQ&usqp=CAU"
                            alt="avt"
                            width={40}
                            height={40}
                        ></img>
                        <p className="mt-[15px]">{`${user.first_name} ${user.last_name}`}</p>
                    </div>
                    <div className="flex mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
                        <button
                            className="bg-[#4397C7] text-white rounded-4 w-[150px] h-[45px] hover:bg-blue-500 hover:text-white items-center justify-center flex overflow-hidden text-ellipsis whitespace-nowrap"
                            type="button"
                        >
                            <ImPhone size={30} className="mb-1 p-1" />
                            {user.phone}
                        </button>
                        <button
                            className="bg-blue-50 text-blue-500 rounded-4 hover:bg-blue-500 hover:text-white w-[80px] h-[45px] border-[1px] border-solid border-blue-500 overflow-hidden text-ellipsis whitespace-nowrap"
                            type="button"
                        >
                            zalo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Item);
