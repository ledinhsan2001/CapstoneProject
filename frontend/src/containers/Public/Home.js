import React, { useEffect } from "react";
//Outlet đại diện route con cho Route mẹ. Khi có các route lồng nhau
import { Outlet } from "react-router-dom";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { NewPost } from "../components/index";
import * as actions from "../../store/actions";
import { Footer, Header, Search } from "./index";
import { Contact, Overview } from "../components/index";

const Home = () => {
    const dispatch = useDispatch();

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
            <Search />
            <div className="column middle bg-[#F5F5F5]">
                <Outlet />
            </div>

            <div className="column side right h-fit">
                <NewPost />
            </div>

            <Overview />
            <Contact />
            <Footer />
        </div>
    );
};

export default Home;
