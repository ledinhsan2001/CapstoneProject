import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import List from "../List";
import { useSelector } from "react-redux";
import { Item, ItemSidebarMain } from "../../components/index";
import { useLocation, useSearchParams } from "react-router-dom";

const DataSearch = () => {
    const location = useLocation();
    const [params] = useSearchParams();
    const { prices, areas } = useSelector((state) => state.price_area);
    const [arr_search, setarr_search] = useState({});

    useEffect(() => {
        let arr_search_id = {};
        for (let i of params.entries()) {
            arr_search_id[i[0]] = i[1];
        }
        setarr_search(arr_search_id);
    }, [params]);

    return (
        <div>
            <div>
                <h5 className="text-black mt-2 text-2xl">
                    <b>{location.state?.title_search}</b>
                </h5>
                <div className="main flex justify-evenly mt-3">
                    <div className="list block bg-[#F5F5F5] w-[67%] overflow-hidden text-ellipsis whitespace-nowrap">
                        <List arr_search={arr_search} />
                    </div>
                    <div className="sidebar mt-5 flex flex-col justify-start items-center w-[28%] bg-[#F5F5F5]">
                        <ItemSidebarMain
                            title="Xem theo giá"
                            data_link_bs={prices.slice(0, 8)}
                            data_link_r={prices.slice(8, 16)}
                            isDouble="ok"
                            price="price"
                            type="gia"
                            home="home"
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
        </div>
    );
};

export default DataSearch;
