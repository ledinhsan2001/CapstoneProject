import React, { useEffect, useState } from "react";
import { title } from "../../../utils/constant";
import "bootstrap/dist/css/bootstrap.min.css";
import List from "../List";
import { useSelector } from "react-redux";
import { ItemSidebarMain } from "../../components/index";
import { useLocation } from "react-router-dom";
import { formatUniToString } from "../../../utils/constant";

const Main = () => {
    const location = useLocation();
    const { prices, areas } = useSelector((state) => state.price_area);
    const [real_home_type_id, setRealHomeTypeId] = useState();
    const { real_home_types_bs, real_home_types_r } = useSelector(
        (state) => state.real_home
    );

    useEffect(() => {
        const real_home_type_sale = real_home_types_bs.find(
            (item) => `/${formatUniToString(item.name)}` === location.pathname
        );
        const real_home_type_rent = real_home_types_r.find(
            (item) => `/${formatUniToString(item.name)}` === location.pathname
        );
        if (real_home_type_sale) {
            setRealHomeTypeId(real_home_type_sale._id);
        }
        if (real_home_type_rent) {
            setRealHomeTypeId(real_home_type_rent._id);
        }
    }, [location, real_home_types_bs, real_home_types_r]);

    return (
        <div>
            <div>
                <div className="text-black mt-2 text-2xl">
                    <b>{title.HeaderMain}</b>
                </div>
                <div className="main flex justify-evenly mt-3">
                    <div className="list block bg-[#F5F5F5] w-[67%] overflow-hidden text-ellipsis whitespace-nowrap">
                        <List real_home_type_id={real_home_type_id} />
                    </div>
                    <div className="sidebar mt-5 flex flex-col justify-start items-center w-[28%] bg-[#F5F5F5]">
                        <ItemSidebarMain
                            title="Xem theo giá"
                            data_link={prices}
                            isDouble="ok"
                            price="price"
                            type="price_id"
                            home="home"
                        />
                        <ItemSidebarMain
                            title="Xem theo diện tích"
                            data_link={areas}
                            isDouble="ok"
                            type="area_id"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
