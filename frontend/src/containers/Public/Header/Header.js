import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { formatUniToString } from "../../../utils/constant";
import {
    LogoNav,
    mdi_user,
    pushnews,
    registeruser,
    Login,
    heart,
} from "../../../assets/images/index";
import { useRef } from "react";
import * as actions from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
    const { transaction_types } = useSelector(
        (state) => state.transaction_type
    );

    const dispatch = useDispatch();
    var query = window.location.search.substring(1);
    const headerRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(actions.actionTransactionType());
        headerRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [query, dispatch]);

    const logOut = (e) => {
        e.preventDefault();
        window.localStorage.clear();
        navigate("/");
    };
    const isLoggedIn = window.localStorage.getItem("isLoggedIn");
    return (
        <div ref={headerRef}>
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-1 mb-1 border-bottom h-[100px] bg-white w-full">
                <div className="col-md-2 mb-2 mb-md-0">
                    <Link to={"/"}>
                        <img
                            className="h-[110px]"
                            src={LogoNav}
                            alt="logo"
                            width="170"
                        ></img>
                    </Link>
                </div>
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 font-normal">
                    <li className="nav-link m-2 px-2">
                        <Link to={"/"}>
                            <h5 className="hover:font-bold">Trang chủ</h5>
                        </Link>
                    </li>
                    {transaction_types?.length > 0 &&
                        transaction_types.map((item) => {
                            return (
                                <li
                                    key={item._id}
                                    className="nav-link m-2 px-2"
                                >
                                    <Link
                                        to={`${formatUniToString(item.name)}`}
                                    >
                                        <h5 className="hover:font-bold">
                                            {item.name}
                                        </h5>
                                    </Link>
                                </li>
                            );
                        })}
                    <li className="nav-link m-2 px-2">
                        <Link to={"/bang-gia-dich-vu"}>
                            <h5 className="hover:font-bold">
                                Bảng giá dịch vụ
                            </h5>
                        </Link>
                    </li>
                    <li className="nav-link m-2 px-2">
                        <Link to={"/blog"}>
                            <h5 className="hover:font-bold">Blog</h5>
                        </Link>
                    </li>
                </ul>

                {isLoggedIn && (
                    <div className="col-md-3 text-end flex items-center">
                        <Link to={"/trang-quan-ly"} className="nav-link m-2">
                            <div className="TagANav flex justify-item items-center">
                                <img
                                    src="pageManagement.png"
                                    alt="pageManagement"
                                    width="30"
                                    height="30"
                                ></img>
                                Trang quản lý
                            </div>
                        </Link>
                        <Link to={"/yeu-thich"} className="nav-link m-2 ">
                            <div className="TagANav flex justify-item items-center">
                                <img
                                    src={heart}
                                    alt="heart"
                                    width="30"
                                    height="30"
                                ></img>
                                Yêu thích
                            </div>
                        </Link>
                        <Link
                            to={"/trang-ca-nhan"}
                            className="nav-link m-2 flex"
                        >
                            <div className="TagUserNav rounded-xl bg-[#D9D9D9] justify-item items-center">
                                <img
                                    src={mdi_user}
                                    alt="mdi_user"
                                    width="35"
                                    height="35"
                                ></img>
                            </div>
                        </Link>
                        <Link to={"/dang-tin"} className="nav-link m-2">
                            <div className="bg-red-500 text-white rounded-xl pr-2 flex justify-item items-center">
                                <img
                                    src={pushnews}
                                    alt="post"
                                    width="45"
                                    height="35"
                                ></img>
                                Đăng tin
                            </div>
                        </Link>
                        <Link to={"/"} className="nav-link">
                            <div className="pushNew" onClick={logOut}>
                                Logout
                            </div>
                        </Link>
                    </div>
                )}
                {!isLoggedIn && (
                    <div className="col-md-3 text-end flex items-center">
                        <Link to={"/dang-ky"} className="nav-link m-2">
                            <div className="TagANav flex justify-item items-center">
                                <img
                                    src={registeruser}
                                    alt="register"
                                    width="30"
                                    height="30"
                                ></img>
                                Đăng ký
                            </div>
                        </Link>
                        <Link to={"/dang-nhap"} className="nav-link m-2">
                            <div className="TagANav flex justify-item items-center">
                                <img
                                    src={Login}
                                    alt="login"
                                    width="30"
                                    height="30"
                                ></img>
                                Đăng nhập
                            </div>
                        </Link>
                        <Link
                            to={"/dang-nhap"}
                            className="nav-link m-2 bg-red text-white rounded-xl pr-2"
                        >
                            <div className="bg-red-500 text-white rounded-xl pr-2 flex justify-item items-center">
                                <img
                                    src={pushnews}
                                    alt="post"
                                    width="45"
                                    height="35"
                                ></img>
                                Đăng tin
                            </div>
                        </Link>
                    </div>
                )}
            </header>
        </div>
    );
};

export default Header;
