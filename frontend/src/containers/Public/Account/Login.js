import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { Link } from "react-router-dom";
import { path } from "../../../utils/constant";
import { imgLogin } from "../../../assets/images";
import Swal from "sweetalert2";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            form: {
                phone: "",
                password: "",
            },
            errors: {},
        };
    }

    handleSubmitLogin = (e) => {
        e.preventDefault();
        const { phone, password } = this.state.form;
        const errors = {};
        var status = true;
        if (phone === "") {
            errors.phone = "Tên tài khoản không được để trống";
            status = false;
        }
        if (password === "") {
            errors.password = "Mật khẩu không được để trống";
            status = false;
        }
        if (!status) {
            this.setState({
                errors: errors,
            });
        } else {
            fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    phone: phone,
                    password: password,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        const alert = () => {
                            Swal.fire("Lỗi!", data.error, "error");
                        };
                        alert();
                        errors.errsv = data.error;
                        this.setState({
                            errors: errors,
                        });
                    } else {
                        Swal.fire(
                            "Thành công!",
                            "Đăng nhập thành công",
                            "success"
                        ).then(() => {
                            //giữ trạng thái loggin khi bật tab mới
                            window.localStorage.setItem("isLoggedIn", true);
                            window.localStorage.setItem(
                                "token",
                                data.accessToken
                            );
                            window.localStorage.setItem(
                                "refreshToken",
                                data.refreshToken
                            );
                            window.location.href = "/";
                        });
                    }
                    document.getElementById("phone").value = "";
                    document.getElementById("password").value = "";
                });
        }
    };

    handleChange = (e) => {
        const data = { ...this.state.form };
        data[e.target.name] = e.target.value;
        this.setState({
            form: data,
        });
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="row w-full">
                <div className="bg-[#ccc6fd]">
                    <div className="container py-5 border-top">
                        <div className="border-[1px] border-black border-solid">
                            <img
                                src={imgLogin}
                                aria-label="Img Login"
                                width="450"
                                height="100%"
                            ></img>
                        </div>
                        <div className="formLR border-[1px] border-solid border-black">
                            <div className="mt-5">
                                <h3 className="account">TÀI KHOẢN</h3>
                            </div>
                            <div className="flex justify-content-center py-3">
                                <Link
                                    to={`/${path.LOGIN}`}
                                    className="border-black border-[1px] border-solid rounded-[10px]"
                                >
                                    <input
                                        type="button"
                                        id="btnLogin"
                                        defaultValue={"Đăng nhập"}
                                        className="px-2"
                                    />
                                </Link>
                                <Link
                                    to={`/${path.REGISTER}`}
                                    className="border-black border-[1px] border-solid rounded-[10px]"
                                >
                                    <input
                                        className="px-2"
                                        type="button"
                                        id="btnRegister"
                                        defaultValue={"Đăng ký"}
                                    />
                                </Link>
                            </div>

                            {/* err from server */}
                            {errors.errsv && (
                                <div className="formPhone">
                                    <div
                                        id="validationName"
                                        className="alert alert-danger"
                                    >
                                        {errors.errsv}
                                    </div>
                                </div>
                            )}

                            {/* Form login */}
                            <form
                                id="formLogin"
                                onSubmit={this.handleSubmitLogin}
                            >
                                <div className="formPhone">
                                    <label htmlFor="username">
                                        Số điện thoại
                                    </label>
                                    <br />
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        placeholder="Nhập số điện thoại"
                                        onChange={this.handleChange}
                                        className="border-black border-[1px] border-solid rounded-[10px] bg-white text-black w-[75%]"
                                    />
                                    {errors.phone && (
                                        <div
                                            id="validationUsername"
                                            className="alert alert-danger"
                                        >
                                            {errors.phone}
                                        </div>
                                    )}
                                </div>
                                <div className="formPhone">
                                    <label htmlFor="password">Mật khẩu</label>
                                    <br />
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="**********"
                                        onChange={this.handleChange}
                                        className="border-black border-[1px] border-solid rounded-[10px] bg-white text-black w-[75%]"
                                    />
                                    {errors.password && (
                                        <div
                                            id="validationPassword"
                                            className="alert alert-danger"
                                        >
                                            {errors.password}
                                        </div>
                                    )}
                                </div>
                                <div className="ml-[20%] text-center text-sm">
                                    <Link to={"/"} className="text-cyan-500">
                                        Quên mật khẩu?
                                    </Link>
                                </div>
                                <div className="flex justify-content-center py-3">
                                    <button type="submit" id="submitLogin">
                                        Đăng nhập
                                    </button>
                                </div>
                                <div className="text-sm">
                                    Tạo tài khoản{" "}
                                    <Link
                                        to={`/${path.REGISTER}`}
                                        className="text-cyan-500"
                                    >
                                        ngay bây giờ?
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;
