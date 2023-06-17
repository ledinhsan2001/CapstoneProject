import React, { useEffect } from "react";
//Outlet đại diện route con cho Route mẹ. Khi có các route lồng nhau
import {
    Outlet,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { NewPost } from "../components/index";
import * as actions from "../../store/actions";
import { Footer, Header, Search } from "./index";
import { Contact, Overview } from "../components/index";
import { path } from "../../utils/constant";
import { logout } from "../../store/actions/auth";

const Home = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { isLoggedIn, message, accessToken, refreshToken } = useSelector(
        (state) => state.auth
    );
    const { user_data } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(actions.actionPrices());
        dispatch(actions.actionAreas());
        dispatch(actions.newPost());
        dispatch(actions.realHomeTypes());
        dispatch(actions.actionGetNewsType());
    }, [dispatch]);

    useEffect(() => {
        setTimeout(() => {
            isLoggedIn && dispatch(actions.actionUser());
        }, 2000);
        if (isLoggedIn && !user_data) {
            dispatch(logout());
            navigate(`/${path.LOGIN}`);
        }
    }, [isLoggedIn]);

    const checkUrl = (url) => {
        let incl = location.pathname.includes(url);
        if (incl) return true;
        return false;
    };

    return (
        <>
            {!checkUrl("chi-tiet") &&
                location.pathname !== `/${path.SERVICE_PRICE}` &&
                !checkUrl("trang-ca-nhan") && (
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
                location.pathname === `/${path.SERVICE_PRICE}` ||
                checkUrl("trang-ca-nhan")) && (
                <div className="w-full">
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
