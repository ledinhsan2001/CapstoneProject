import React, { useEffect } from "react";
//Outlet đại diện route con cho Route mẹ. Khi có các route lồng nhau
import { Outlet, useLocation } from "react-router-dom";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { NewPost } from "../components/index";
import * as actions from "../../store/actions";
import { Footer, Header, Search } from "./index";
import { Contact, Overview } from "../components/index";
import { path } from "../../utils/constant";

const Home = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const isLoggedIn = window.localStorage.getItem("isLoggedIn");
    const refreshToken = window.localStorage.getItem("refreshToken");
    const token = window.localStorage.getItem("token");

    useEffect(() => {
        dispatch(actions.actionPrices());
        dispatch(actions.actionAreas());
        dispatch(actions.newPost());
        dispatch(actions.realHomeTypes());
    }, [dispatch]);
    return (
        <div className="row w-full">
            <Header />
            {!location.pathname.includes("chi-tiet") &&
                location.pathname !== `/${path.SERVICE_PRICE}` && <Search />}

            {!location.pathname.includes("chi-tiet") &&
                location.pathname !== `/${path.SERVICE_PRICE}` && (
                    <div className="column middle bg-[#F5F5F5]">
                        <Outlet />
                    </div>
                )}
            {(location.pathname.includes("chi-tiet") ||
                location.pathname === `/${path.SERVICE_PRICE}`) && (
                <div className="bg-[#D9D9D9]">
                    <Outlet />
                </div>
            )}

            {!location.pathname.includes("chi-tiet") &&
                location.pathname !== `/${path.SERVICE_PRICE}` && (
                    <div className="column side right h-fit">
                        <NewPost />
                    </div>
                )}

            {!location.pathname.includes("chi-tiet") && <Overview />}
            {!location.pathname.includes("chi-tiet") && <Contact />}
            <Footer />
        </div>
    );
};

export default Home;
