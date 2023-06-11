import React, { useEffect } from "react";
//Outlet đại diện route con cho Route mẹ. Khi có các route lồng nhau
import { Outlet, useLocation } from "react-router-dom";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { NewPost } from "../components/index";
import * as actions from "../../store/actions";
import { Footer, Header, Search } from "./index";
import { Contact, Overview } from "../components/index";
import { path } from "../../utils/constant";

const Home = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { isLoggedIn, token, refreshToken, message } = useSelector(
        (state) => state.auth
    );
    useEffect(() => {
        dispatch(actions.actionPrices());
        dispatch(actions.actionAreas());
        dispatch(actions.newPost());
        dispatch(actions.realHomeTypes());
    }, [dispatch]);

    const checkUrl = (url) => {
        let incl = location.pathname.includes(url);
        if (incl) return true;
        return false;
    };

    return (
        <>
            {!checkUrl("chi-tiet") &&
                location.pathname !== `/${path.SERVICE_PRICE}` && (
                    <div className="row w-full">
                        <Header />
                        <Search />

                        <div className="column middle bg-[#F5F5F5]">
                            <Outlet />
                        </div>
                        <div className="column side right h-fit">
                            <NewPost />
                        </div>
                        {!checkUrl("chi-tiet") && <Overview />}
                        {!checkUrl("chi-tiet") && <Contact />}
                        <Footer />
                    </div>
                )}
            {(checkUrl("chi-tiet") ||
                location.pathname === `/${path.SERVICE_PRICE}`) && (
                <div className="row w-full">
                    <Header />
                    <div className="bg-[#D9D9D9]">
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            )}
        </>
    );
};

export default Home;
