import React, { memo, useEffect, useState } from "react";
import "./Item.css";
import icons from "../../utils/icons";
import { formatUniToString, path } from "../../utils/constant";
import { Link, useNavigate } from "react-router-dom";
import { apiDelSavePost, apiSavePost } from "../../services";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { actionGetSavePost } from "../../store/actions";
import { MdAccessTime } from "react-icons/md";
import moment from "moment";
import "moment/locale/vi";

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
    upAt,
    active,
    news_type_id,
}) => {
    const dispatch = useDispatch();
    const [isHoverHeart, setIsHoverHeart] = useState(active ? true : false);
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state) => state.auth);

    const callNotSave = async () => {
        try {
            const response = await apiDelSavePost(_id);
            setIsHoverHeart(false);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: response.data.message,
                showConfirmButton: false,
                timer: 500,
            });
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 500,
            });
        }
    };

    const callSave = async () => {
        if (!isLoggedIn) {
            navigate(`/${path.LOGIN}`);
        } else {
            const response = await apiSavePost(_id);
            setIsHoverHeart(true);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: response.data.message,
                showConfirmButton: false,
                timer: 500,
            });
        }
    };

    useEffect(() => {
        isLoggedIn && dispatch(actionGetSavePost());
    }, [isHoverHeart]);

    const data = address.split(",");
    let province = data.pop();
    let district = data.pop();
    let Address = `${district},${province}`;

    return (
        <div className="flex w-[100%] border-t-[2px] border-solid border-orange-400 pt-[10px] pb-[20px] bg-white">
            <Link
                to={`/chi-tiet/${_id}/${formatUniToString(shortDescription)}`}
                className="flex w-[40%] float-left h-[310px] whitespace-pre-wrap relative cursor-pointer pr-2 "
            >
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
                    onClick={(e) => {
                        e.preventDefault();
                        if (isHoverHeart) {
                            callNotSave();
                        } else {
                            callSave();
                        }
                    }}
                >
                    {isHoverHeart ? (
                        <RiHeartFill
                            size={28}
                            color="red"
                            className="hover:text-red-500"
                        />
                    ) : (
                        <RiHeartFill size={28} className="hover:text-red-500" />
                    )}
                </span>
            </Link>
            <div className="w-[60%]">
                <Link
                    to={`/chi-tiet/${_id}/${formatUniToString(
                        shortDescription
                    )}`}
                    className="pt-2"
                >
                    <div
                        className={`short-des max-h-[65px] text-ellipsis text-left ml-1 items-center whitespace-pre-line overflow-hidden ${
                            +news_type_id === 0
                                ? `text-red-500 hover:text-red-300`
                                : +news_type_id === 1
                                ? `text-[#ED0CC9] hover:text-[#f593e5]`
                                : `text-blue-500 hover:text-blue-300`
                        }`}
                    >
                        {+news_type_id !== 2 && (
                            <FaStar
                                size={30}
                                color="orange"
                                className="inline-block mb-1"
                            />
                        )}
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
                    <span className="flex text-gray-400">
                        <MdAccessTime className="m-1" />
                        {moment(upAt).fromNow()}
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
                    <Link
                        to={`/chi-tiet/${_id}/${formatUniToString(
                            shortDescription
                        )}`}
                        className="overflow-hidden text-ellipsis whitespace-nowrap flex"
                    >
                        <img
                            className="m-2 rounded-[20px] object-cover"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoZinWG8a5dwB2QOpCXxdOcn8G3TSVYkZ7VQ&usqp=CAU"
                            alt="avt"
                            width={40}
                            height={40}
                        ></img>
                        <p className="mt-[15px]">{`${user.first_name} ${user.last_name}`}</p>
                    </Link>
                    <div className="flex mt-1 overflow-hidden text-ellipsis whitespace-nowrap mr-1">
                        <button
                            className="bg-[#4397C7] text-white rounded-4 w-[150px] h-[45px] hover:bg-blue-500 hover:text-white items-center justify-center flex overflow-hidden text-ellipsis whitespace-nowrap"
                            type="button"
                        >
                            <ImPhone size={30} className="mb-1 p-1" />
                            {user.phone}
                        </button>
                        <a
                            className="bg-blue-50 text-blue-500 rounded-4 hover:bg-blue-500 hover:text-white w-[80px] h-[45px] border-[1px] border-solid border-blue-500 overflow-hidden text-ellipsis whitespace-nowrap items-center flex justify-center"
                            href={`http://zalo.me/${user.phone}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            zalo
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Item);
