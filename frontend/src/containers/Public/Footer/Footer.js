import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <div className="Footer">
            <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-4 border-top">
                <div className="col-md-6 mb-2 mb-md-0">
                    <Link to={"/"}>
                        <img
                            src="LogoNav.svg"
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
                <div className="col mb-3">
                    <h5>
                        <b>Về BDS</b>
                    </h5>
                    <Link to={"/"}>Trang chủ</Link>
                    <br />
                    <Link to={"/"}>Giới thiệu</Link>
                    <br />
                    <Link to={"/"}>Quy định sử dụng</Link>
                    <br />
                    <Link to={"/"}>Liên hệ</Link>
                </div>
                <div className="col mb-3">
                    <h5>
                        <b>Hỗ trợ khách hàng</b>
                    </h5>
                    <Link to={"/"}>Tin tức</Link>
                    <br />
                    <Link to={"/"}>Bảng giá dịch vụ</Link>
                    <br />
                    <Link to={"/"}>Hướng dẫn đăng tin</Link>
                    <br />
                    <Link to={"/"}>Chính sách đăng tin</Link>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
