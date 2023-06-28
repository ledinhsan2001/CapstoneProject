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
        const searchParams = new URLSearchParams(location.search);

        //get cac name from search to show title page search data
        let title_search = "";
        let obj_search_id = {};
        let obj_search_name = {};

        for (let i of searchParams.entries()) {
            // real_home:Mua bán, real_home_id:35256346
            if (!i[0].includes("_id")) {
                obj_search_name[i[0]] = i[1];
            }
            if (i[0].includes("_id")) {
                obj_search_id[i[0]] = i[1];
            }
        }

        const exist_category =
            obj_search_name.transaction_type || obj_search_name.real_home_type
                ? true
                : false;

        if (exist_category) {
            for (let i in obj_search_name) {
                title_search += `${obj_search_name[i]}, `;
            }
        } else {
            // only have price, area, province
            title_search = "Bất động sản ";
            for (let i in obj_search_id) {
                title_search += `${obj_search_id[i]}, `;
            }
        }
        settitle(title_search);

        setarr_search(obj_search_id);
    }, [params]);

    return (
        <div>
            <div>
                <div className="text-black mt-2 text-2xl">
                    <b>{title}</b>
                </div>
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
