import { Link } from "react-router-dom";
import { LogoNav } from "../../../assets/images/index";
import { formatUniToString } from "../../../utils/constant";

const Footer = () => {
    return (
        <div className="border-t-black bg-white mt-2 w-full">
            <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-4 border-top">
                <div className="col-md-6 mb-2 ml-2">
                    <Link to={"/"}>
                        <img
                            src={LogoNav}
                            alt="logo"
                            width="170"
                            height="100"
                        ></img>
                    </Link>
                    <br></br>
                    <br></br>
                    <p>Hotline: 0326687233</p>
                    <p>
                        Địa chỉ: 100 Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên
                        Chiểu, Đà Nẵng
                    </p>
                </div>
                <div className="col block">
                    <h5 className="mb-3">
                        <b>Về BDS</b>
                    </h5>
                    <div className="mb-2">
                        <Link to={`/${formatUniToString("Trang chủ")}`}>
                            Trang chủ
                        </Link>
                    </div>
                    <div className="mb-2">
                        <Link
                            to={`/${formatUniToString("Giới thiệu")}`}
                            className="mb-2"
                        >
                            Giới thiệu
                        </Link>
                    </div>
                    <div className="mb-2">
                        <Link
                            to={`/${formatUniToString("Quy định sử dụng")}`}
                            className="mb-2"
                        >
                            Quy định sử dụng
                        </Link>
                    </div>
                    <div className="mb-2">
                        <Link
                            to={`/${formatUniToString("Liên hệ")}`}
                            className="mb-2"
                        >
                            Liên hệ
                        </Link>
                    </div>
                </div>
                <div className="col block">
                    <h5 className="mb-3">
                        <b>Hỗ trợ khách hàng</b>
                    </h5>
                    <div className="mb-2">
                        <Link to={`/${formatUniToString("Tin tức")}`}>
                            Tin tức
                        </Link>
                    </div>
                    <div className="mb-2">
                        <Link
                            to={`/${formatUniToString("Bảng giá dịch vụ")}`}
                            className="mb-2"
                        >
                            Bảng giá dịch vụ
                        </Link>
                    </div>
                    <div className="mb-2">
                        <Link
                            to={`/${formatUniToString("Hướng dẫn đăng tin")}`}
                            className="mb-2"
                        >
                            Hướng dẫn đăng tin
                        </Link>
                    </div>
                    <div className="mb-2">
                        <Link
                            to={`/${formatUniToString("Chính sách đăng tin")}`}
                            className="mb-2"
                        >
                            Chính sách đăng tin
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
