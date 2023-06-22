import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import List from "../List";
import { useSelector } from "react-redux";
import { ItemSidebarMain } from "../../components/index";
import { useLocation, useSearchParams } from "react-router-dom";

const DataSearch = () => {
    const location = useLocation();
    const [params] = useSearchParams();
    const { prices, areas } = useSelector((state) => state.price_area);
    const [arr_search, setarr_search] = useState({});
    const [title, settitle] = useState("");

    useEffect(() => {
        let arr_search_id = {};
        // obligate use entries get params => [] and assign object(arr_search_id)
        for (let i of params.entries()) {
            arr_search_id[i[0]] = i[1];
        }
        setarr_search(arr_search_id);
    }, [params]);

    useEffect(() => {
        settitle(location.state?.title_search);
    }, [location]);

    return (
        <div>
            <div>
                <h5 className="text-black mt-2 text-2xl">
                    <b>{title}</b>
                </h5>
                <div className="main flex justify-evenly mt-3">
                    <div className="list block bg-[#F5F5F5] w-[67%] overflow-hidden text-ellipsis whitespace-nowrap">
                        <List arr_search={arr_search} />
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

export default DataSearch;
