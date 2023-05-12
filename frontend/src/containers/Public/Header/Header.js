import { Link } from "react-router-dom";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { apiGetTransactionType } from "../../../services/transactionType";
import { formatUniToString } from "../../../utils/constant";

const Header = () => {
    const navigate = useNavigate();
    const [transactionType, settransactionType] = useState([]);
    useEffect(() => {
        const fetTransType = async () => {
            const response = await apiGetTransactionType();
            if (response.data.success === true) {
                settransactionType(response.data.data);
            }
        };
        fetTransType();
    }, []);

    const logOut = (e) => {
        e.preventDefault();
        window.localStorage.clear();
        navigate("/");
    };
    const isLoggedIn = window.localStorage.getItem("isLoggedIn");
    return (
        <div>
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-1 mb-1 border-bottom">
                <div className="col-md-3 mb-2 mb-md-0">
                    <Link to={"/"}>
                        <img
                            src="LogoNav.svg"
                            alt="logo"
                            width="170"
                            height="100"
                        ></img>
                    </Link>
                </div>
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li className="nav-link px-2 link-secondary">
                        <Link to={"/"}>Trang chủ</Link>
                    </li>
                    {transactionType.length > 0 &&
                        transactionType.map((item) => {
                            return (
                                <li
                                    key={item._id}
                                    className="nav-link px-2 link-secondary"
                                >
                                    <Link
                                        to={`${formatUniToString(item.name)}`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    <li className="nav-link px-2 link-secondary">
                        <Link to={"/bang-gia-dich-vu"}>Bảng giá dịch vụ</Link>
                    </li>
                    <li className="nav-link px-2 link-secondary">
                        <Link to={"/blog"}>Blog</Link>
                    </li>
                </ul>

                {isLoggedIn && (
                    <div
                        className="col-md-3 text-end"
                        style={{ display: "flex" }}
                    >
                        <Link to={"/trang-quan-ly"} className="nav-link">
                            <div className="TagANav">
                                <img
                                    src="pageManagement.png"
                                    alt="pageManagement"
                                    width="30"
                                    height="30"
                                ></img>
                                Trang quản lý
                            </div>
                        </Link>
                        <Link to={"/yeu-thich"} className="nav-link">
                            <div className="TagANav">
                                <img
                                    src="heart.png"
                                    alt="heart"
                                    width="30"
                                    height="30"
                                ></img>
                                Yêu thích
                            </div>
                        </Link>
                        <Link to={"/trang-ca-nhan"} className="nav-link">
                            <div className="TagUserNav">
                                <img
                                    src="mdi_user.png"
                                    alt="mdi_user"
                                    width="35"
                                    height="35"
                                ></img>
                            </div>
                        </Link>
                        <Link to={"/dang-tin"} className="nav-link">
                            <div className="pushNew">
                                <img
                                    src="pushnews.png"
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
                    <div
                        className="col-md-3 text-end"
                        style={{ display: "flex" }}
                    >
                        <Link to={"/dang-ky"} className="nav-link">
                            <div className="TagANav">
                                <img
                                    src="registeruser.png"
                                    alt="register"
                                    width="30"
                                    height="30"
                                ></img>
                                Đăng ký
                            </div>
                        </Link>
                        <Link to={"/dang-nhap"} className="nav-link ">
                            <div className="TagANav">
                                <img
                                    src="Login.png"
                                    alt="login"
                                    width="30"
                                    height="30"
                                ></img>
                                Đăng nhập
                            </div>
                        </Link>
                        <Link to={"/dang-nhap"} className="nav-link">
                            <div className="pushNew">
                                <img
                                    src="pushnews.png"
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
