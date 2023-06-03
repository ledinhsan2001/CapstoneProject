import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { useSearchParams } from "react-router-dom";
import { GetNummberFromString } from "../../utils/constant";
import moment from "moment";
import icons from "../../utils/icons";
import EditPost from "./EditPost";
import { apiDeleteRealHome } from "../../services";
import Swal from "sweetalert2";

const { MdDeleteOutline, CiEdit } = icons;

const ManagePost = () => {
    const [isShow, setisShow] = useState(false);
    const [isDeleted, setisDeleted] = useState(false);
    const dispatch = useDispatch();
    const [params] = useSearchParams();
    const [real_home_user, setreal_home_user] = useState([]);
    const { real_homes_by_user, message, data_edit } = useSelector(
        (state) => state.real_home
    );

    useEffect(() => {
        let page = params.get("page");
        page = page ? page : 0;
        if (!data_edit) {
            setisShow(false);
            dispatch(actions.realHomeByUser(page));
        }
    }, [data_edit, isDeleted]);

    // day_expire have after day_current? n => expired
    const check_expired = (end) =>
        moment(end, "DD/MM/YYYY").isAfter(new Date());

    const handleDelete = async (item) => {
        Swal.fire({
            title: "Bạn có chắc muốn xóa không?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Vâng, tôi có!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiDeleteRealHome({
                    _id: item._id,
                    description_id: item.description._id,
                    images_id: item.images._id,
                });
                if (response?.data?.success === true) {
                    Swal.fire("Xóa!", response?.data?.message, "success");
                    setisDeleted(!isDeleted);
                } else {
                    Swal.fire("Lỗi!", response.data.message, "error");
                }
            }
        });
    };

    const handleFilter = (value) => {
        console.log(value);
        if (value === 1) {
            let expired = real_homes_by_user.filter(
                (item) => !check_expired(item?.end_date.split(" ")[3])
            );
            setreal_home_user(expired);
        } else if (value === 2) {
            let unexpired = real_homes_by_user.filter((item) =>
                check_expired(item?.end_date.split(" ")[3])
            );
            setreal_home_user(unexpired);
        } else {
            setreal_home_user(real_homes_by_user);
        }
    };

    return (
        <div>
            <div className="px-10">
                <div className="text-left text-black font-bold text-4xl pb-4">
                    Quản lý tin đăng
                </div>
                <div className="my-2 flex items-center text-right">
                    <p className="mr-4">Lọc trạng thái</p>
                    <select
                        className=" h-[40px] w-[150px] px-2 rounded-xl border-solid border-1 border-black hover:bg-white hover:text-black hover:border-solid hover:border-2 hover:border-blue-300 cursor-pointer"
                        onChange={(e) => handleFilter(+e.target.value)}
                    >
                        <option className="text-gray-500 font-bold" value={0}>
                            Tất cả
                        </option>
                        <option className="text-gray-500 font-bold" value={1}>
                            Đã hết hạn
                        </option>
                        <option className="text-gray-500 font-bold" value={2}>
                            Chưa hết hạn
                        </option>
                    </select>
                </div>
                <table className="table-fixed border-[2px] border-gray-600 border-separate bg-white w-full">
                    <thead className="text-lg bg-gray-500 text-white">
                        <tr>
                            <th className="border-[1px] border-gray-400 w-[8%]">
                                Mã tin đăng
                            </th>
                            <th className="border-[1px] border-gray-400 w-[10%]">
                                Ảnh
                            </th>
                            <th className="border-[1px] border-gray-400 ">
                                Tiêu đề
                            </th>
                            <th className="border-[1px] border-gray-400 w-[14%]">
                                Giá
                            </th>
                            <th className="border-[1px] border-gray-400 w-[16%]">
                                Ngày bắt đầu
                            </th>
                            <th className="border-[1px] border-gray-400 w-[14%]">
                                Ngày hết hạn
                            </th>
                            <th className="border-[1px] border-gray-400 w-[8%]">
                                Trạng thái
                            </th>
                            <th className="w-[10%]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {real_home_user?.map((item) => {
                            const images = item?.images?.url
                                ? JSON.parse(item?.images?.url)
                                : [];
                            return (
                                <tr key={item._id} className="w-full h-[80px]">
                                    <td className="border-[1px] border-gray-400 font-bold text-ellipsis whitespace-pre-line overflow-hidden">
                                        {`#${GetNummberFromString(item?._id)}`}
                                    </td>
                                    <td className="flex border-[1px] border-gray-400 items-center justify-center">
                                        <img
                                            className=" h-[80px] w-[100%] object-cover rounded-sm "
                                            src={images[0]}
                                            alt="img"
                                        ></img>
                                    </td>
                                    <td className="border-[1px] border-gray-400 text-red-500 max-h-[65px] text-ellipsis text-center text-lg ml-1 items-center whitespace-pre-line overflow-hidden">
                                        {`${item?.description?.title_description.slice(
                                            0,
                                            60
                                        )}...`}
                                    </td>
                                    <td className="border-[1px] border-gray-400 text-[#16c784] text-[20px] font-bold">
                                        {item?.description?.price}
                                    </td>
                                    <td className="border-[1px] border-gray-400">
                                        {item?.start_date}
                                    </td>
                                    <td className="border-[1px] border-gray-400">
                                        {item?.end_date}
                                    </td>
                                    {check_expired(
                                        item?.end_date.split(" ")[3]
                                    ) ? (
                                        <td className="border-[1px] border-gray-400 bg-blue-200">
                                            Chưa hết hạn
                                        </td>
                                    ) : (
                                        <td className="border-[1px] border-gray-400 bg-red-200">
                                            Đã hết hạn
                                        </td>
                                    )}
                                    <td className="border-[1px] border-gray-400 font-bold justify-center">
                                        <div className="flex justify-center gap-1">
                                            <button
                                                className="cursor-pointer py-2 px-1 rounded-md bg-green-500 text-white flex items-center overflow-hidden"
                                                onClick={() => {
                                                    dispatch(
                                                        actions.dataEdit(item)
                                                    );
                                                    setisShow(true);
                                                }}
                                            >
                                                <CiEdit
                                                    color="white"
                                                    size={24}
                                                />
                                                Sửa
                                            </button>
                                            <button
                                                className="cursor-pointer py-2 px-2 rounded-md bg-red-400 text-white flex items-center overflow-hidden"
                                                onClick={() =>
                                                    handleDelete(item)
                                                }
                                            >
                                                <MdDeleteOutline size={24} />
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {message && <div className="bg-white">{message}</div>}
                {isShow && <EditPost setisShow={setisShow} />}
            </div>
        </div>
    );
};

export default ManagePost;
