import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "../../utils/constant";
import SideBar from "./SideBar";
import { Header } from "../Public";
import { Contact } from "../components";

const Private = () => {
    const isLoggedIn = window.localStorage.getItem("isLoggedIn");
    // replace xoa lịch sử không cho back web
    if (!isLoggedIn) {
        return <Navigate to={`/${path.LOGIN}`} replace={true} />;
    }
    return (
        <div className="w-full h-screen flex flex-col items-center">
            <Header />
            <div className="flex w-full flex-auto">
                <SideBar />
                <div className="flex-auto bg-[#F5F5F5] shadow-md h-screen p-4 overflow-y-scroll">
                    <Outlet />
                </div>
            </div>
            <Contact />
        </div>
    );
};
export default Private;
