import React from "react";
import Search from "../Search/Search";
import { LinkNavigate } from "../../components";
import icons from "../../../utils/icons";
import "./Rental.css";
import List from "../List";
import { ItemSidebarMain, NewPost } from "../../components/index";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { formatUniToString } from "../../../utils/constant";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const { IoIosArrowForward } = icons;

const BuySell = () => {
    const location = useLocation();
    const [transaction_type_id, setTransactionTypeId] = useState();
    const { real_home_types_r } = useSelector((state) => state.real_home_type);
    const { prices } = useSelector((state) => state.price);
    const { areas } = useSelector((state) => state.area);
    const { transaction_types } = useSelector(
        (state) => state.transaction_type
    );

    useEffect(() => {
        const transaction_type = transaction_types.find(
            (item) => `/${formatUniToString(item.name)}` === location.pathname
        );
        if (transaction_type) {
            setTransactionTypeId(transaction_type._id);
        }
    }, [location, transaction_types]);
    return (
        <div className="row w-full">
            <Search></Search>
            <div className="column middle bg-[#F5F5F5]">
                <div className="bg-[#F5F5F5]">
                    <h3 className="text-black mt-3 text-2xl">
                        <b>Cho thuê bất động sản ưu đãi 2023</b>
                    </h3>
                    <div className="column-main-buysell ml-[20px] mt-4 p-[1%] rounded-[15px] bg-white w-[96%]">
                        <div className="container max-h-[100px] max-w-[100%] flex flex-wrap text-justify overflow-hidden textflow-ellipsis whitespace-pre-line">
                            {real_home_types_r?.length > 0 &&
                                real_home_types_r.map((item) => {
                                    return (
                                        <LinkNavigate
                                            key={item._id}
                                            text={item.name}
                                            icon={
                                                <IoIosArrowForward
                                                    color="red"
                                                    className="max-w-[30%] "
                                                />
                                            }
                                            className={"w-50px"}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </div>
                <div className="main flex justify-evenly mt-3">
                    <div className="list block bg-[#F5F5F5] w-[67%] overflow-hidden text-ellipsis whitespace-nowrap">
                        <List transaction_type_id={transaction_type_id} />
                    </div>
                    <div className="sidebar mt-5 flex flex-col justify-start items-center w-[28%] bg-[#F5F5F5]">
                        <ItemSidebarMain
                            title="Danh sách cho thuê"
                            data_link={real_home_types_r}
                        />
                        <ItemSidebarMain
                            title="Xem theo giá"
                            data_link={prices}
                            isDouble="ok"
                            price="price"
                            type="gia"
                        />
                        <ItemSidebarMain
                            title="Xem theo diện tích"
                            data_link={areas}
                            isDouble="ok"
                            type="dien_tich"
                        />
                    </div>
                </div>
            </div>

            <div className="column side right h-fit">
                <NewPost />
            </div>
        </div>
    );
};

export default BuySell;
