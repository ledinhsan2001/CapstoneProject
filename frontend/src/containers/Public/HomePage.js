import React from "react";
import { title } from "../../utils/constant";
import "bootstrap/dist/css/bootstrap.min.css";
import { UrlHomePage } from "./index";
import List from "./List";
import { useSelector } from "react-redux";
import { ItemSidebarMain } from "../components/index";

const HomePage = () => {
    const { prices, areas } = useSelector((state) => state.price_area);

    return (
        <div>
            <div>
                <h5 className="text-black mt-2 text-2xl">
                    <b>{title.HeaderMain}</b>
                </h5>
                <div className="column-main flex w-[98%]">
                    <UrlHomePage />
                </div>
                <div className="main flex justify-evenly mt-3">
                    <div className="list block bg-[#F5F5F5] w-[67%] overflow-hidden text-ellipsis whitespace-nowrap">
                        <List />
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

export default HomePage;
