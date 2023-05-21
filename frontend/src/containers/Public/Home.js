import React, { useEffect } from "react";
//Outlet đại diện route con cho Route mẹ. Khi có các route lồng nhau
// import  { Outlet } from "react-router-dom";
import "./Home.css";
import Search from "./Search/Search";
import { title } from "../../utils/constant";
import "bootstrap/dist/css/bootstrap.min.css";
import { UrlHomePage } from "./index";
import List from "./List";
import { useDispatch, useSelector } from "react-redux";
import { ItemSidebarMain, NewPost } from "../components/index";
import * as actions from "../../store/actions";

const Home = () => {
    const { prices } = useSelector((state) => state.price);
    const { areas } = useSelector((state) => state.area);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.actionPrices());
        dispatch(actions.actionAreas());
        dispatch(actions.newPost());
        dispatch(actions.realHomeTypes());
    }, [dispatch]);

    return (
        <div className="row w-full">
            <Search></Search>

            <div className="column middle bg-[#F5F5F5]">
                <h5 className="text-black mt-2 text-2xl">
                    <b>{title.HeaderMain}</b>
                </h5>
                <div className="column-main flex">
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

            <div className="column side right h-fit">
                <NewPost />
            </div>
        </div>
    );
};

export default Home;
