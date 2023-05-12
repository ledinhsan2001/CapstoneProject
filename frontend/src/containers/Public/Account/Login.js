import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { Link } from "react-router-dom";

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
                    alert(data.message);
                    if (data.error) {
                        errors.errsv = data.error;
                        this.setState({
                            errors: errors,
                        });
                    } else {
                        //giữ trạng thái loggin khi bật tab mới
                        window.localStorage.setItem("isLoggedIn", true);
                        window.localStorage.setItem("token", data.accessToken);
                        window.localStorage.setItem(
                            "refreshToken",
                            data.refreshToken
                        );
                        window.location.href = "/";
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
            <div className="body">
                <div className="container py-5 border-top">
                    <div className="imgLogin col-md-4 mb-2 mb-md-0">
                        <object
                            data="imgLogin.png"
                            aria-label="Alternative Text"
                            width="450"
                            height="100%"
                        ></object>
                    </div>
                    <div className="formLR col-md-3 mb-2 mb-md-0">
                        <div className="mt-5">
                            <h3>TÀI KHOẢN</h3>
                        </div>
                        <div className="btnLR d-flex justify-content-center py-3">
                            <Link to={"/login"}>
                                <input
                                    type="button"
                                    id="btnLogin"
                                    defaultValue={"Đăng nhập"}
                                />
                            </Link>
                            <Link to={"/register"}>
                                <input
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
                        <form id="formLogin" onSubmit={this.handleSubmitLogin}>
                            <div className="formPhone">
                                <label htmlFor="username">Số điện thoại</label>
                                <br />
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    placeholder="Nhập số điện thoại"
                                    onChange={this.handleChange}
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
                            <div className="aLogin">
                                <Link to={"/"}>Quên mật khẩu?</Link>
                            </div>
                            <div className="btnLR d-flex justify-content-center py-3">
                                <button type="submit" id="submitLogin">
                                    Đăng nhập
                                </button>
                            </div>
                            <div className="aRegister">
                                Tạo tài khoản{" "}
                                <Link to={"/register"}>ngay bây giờ?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;
