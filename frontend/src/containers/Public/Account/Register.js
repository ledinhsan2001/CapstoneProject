import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";
import firebaseCF from "../../../config/firebase";
import { Link } from "react-router-dom";
import { imgLogin } from "../../../assets/images";
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";
import { path } from "../../../utils/constant";
import Swal from "sweetalert2";

const auth = getAuth(firebaseCF);

class Register extends Component {
    constructor() {
        super();
        this.state = {
            formRegister: {
                firstname: "",
                lastname: "",
                phone2: "",
                password2: "",
                repassword: "",
                otp: "",
            },
            buttonVerify: false,
            verifyOtp: false,
            verified: false,
            errors: {},
        };
    }

    //show captcha trêngiao diện
    onCaptchaVerify = () => {
        //run2 run6
        window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: (response) => {
                    //run4
                    this.onSignInSubmit();
                    //run9
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    // ...
                },
            },
            auth
        );
    };

    //click verify
    onSignInSubmit = (e) => {
        //run1 run5
        this.onCaptchaVerify();
        //run2 sau capcha.  run7

        const phoneNumber = "+84" + this.state.formRegister.phone2;
        const appVerifier = window.recaptchaVerifier;
        //run3=> validateVerify form  run8

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;

                //run10
                const alert = () => {
                    Swal.fire(
                        "OTP!",
                        `Mã otp đã gửi đến: ${phoneNumber}`,
                        "success"
                    );
                };
                alert();
                this.setState({
                    verifyOtp: true,
                });
                // ...
            })
            .catch((error) => {
                // Error; SMS not sent
                // ...
            });
    };

    verifyCode = () => {
        window.confirmationResult
            .confirm(this.state.formRegister.otp)
            .then((result) => {
                // User signed in successfully.
                // alert(result);
                const errors = {};
                errors.verify = "";
                this.setState({
                    errors: errors,
                });
                const alert = () => {
                    Swal.fire("OTP!", `Xác nhận mã OTP thành công`, "success");
                };
                alert();
                this.setState({
                    verified: true,
                    verifyOtp: false,
                });
                // ...
            })
            .catch((error) => {
                // User couldn't sign in (bad verification code?)
                const alert = () => {
                    Swal.fire("OTP!", `Mã OTP không chính xác`, "error");
                };
                alert();
                // ...
            });
    };

    handleSubmitRegister = (e) => {
        e.preventDefault();
        const { firstname, lastname, phone2, password2, repassword } =
            this.state.formRegister;
        const errors = {};
        var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (this.state.verified) {
            let status = true;
            errors.verify = "";
            if (firstname === "") {
                errors.fname = "Họ tên không được để trống";
                status = false;
            }
            if (lastname === "") {
                errors.lname = "Tên không được để trống";
                status = false;
            }
            if (phone2 === "") {
                errors.phone2 = "Số điện thoại không được để trống";
                status = false;
            }
            if (!vnf_regex.test(phone2)) {
                errors.phone2 = "Định dạng chưa chính xác";
                status = false;
            }
            if (password2 === "") {
                errors.password2 = "Mật khẩu không được để trống";
                status = false;
            }
            if (!(password2 === repassword)) {
                errors.repassword = "Mật khẩu không giống nhau";
                status = false;
            }
            if (repassword === "") {
                errors.repassword = "Nhập lại mật khẩu không được để trống";
                status = false;
            }
            if (!status) {
                this.setState({
                    errors: errors,
                });
            } else {
                fetch("http://localhost:8080/api/auth/register", {
                    method: "POST",
                    crossDomain: true,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                        first_name: firstname,
                        last_name: lastname,
                        phone: phone2,
                        password: password2,
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.error) {
                            const alert = () => {
                                Swal.fire("OTP!", data.error, "error");
                            };
                            alert();
                            errors.errsv = data.error;
                            this.setState({
                                errors: errors,
                            });
                        } else {
                            const alert = () => {
                                Swal.fire(
                                    "Thành công!",
                                    "Đăng ký thành công",
                                    "success"
                                ).then(() => {
                                    window.location.href = "./login";
                                });
                            };
                            alert();
                        }
                        document.getElementById("firstname").value = "";
                        document.getElementById("lastname").value = "";
                        document.getElementById("phone2").value = "";
                        document.getElementById("otp").value = "";
                        document.getElementById("password2").value = "";
                        document.getElementById("repassword").value = "";
                    });
            }
        } else {
            let status = false;
            errors.verify = "Yêu cầu xác thực số điện thoại";
            if (firstname === "") {
                errors.fname = "Họ tên không được để trống";
                status = false;
            }
            if (lastname === "") {
                errors.lname = "Tên không được để trống";
                status = false;
            }
            if (phone2 === "") {
                errors.phone2 = "Số điện thoại không được để trống";
                status = false;
            }
            if (!vnf_regex.test(phone2)) {
                errors.phone2 = "Định dạng chưa chính xác";
                status = false;
            }
            if (password2 === "") {
                errors.password2 = "Mật khẩu không được để trống";
                status = false;
            }
            if (!(password2 === repassword)) {
                errors.repassword = "Mật khẩu không giống nhau";
                status = false;
            }
            if (repassword === "") {
                errors.repassword = "Nhập lại mật khẩu không được để trống";
                status = false;
            }
            if (!status) {
                this.setState({
                    errors: errors,
                });
            }
        }
    };

    handleChangeRegister = (e) => {
        const data = { ...this.state.formRegister };
        data[e.target.name] = e.target.value;
        this.setState(
            {
                formRegister: data,
            },
            () => {
                var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                var lengthNumber = this.state.formRegister.phone2.length;
                if (
                    lengthNumber === 10 &&
                    vnf_regex.test(this.state.formRegister.phone2)
                ) {
                    this.setState({ buttonVerify: true });
                } else {
                    this.setState({ buttonVerify: false });
                }
            }
        );
    };

    render() {
        const { errors } = this.state;
        return (
            <div className="row w-full">
                <div className="bg-[#CCC6FD]">
                    <div className="flex text-center justify-center py-2 border-top">
                        <div className="border-[1px] border-black border-solid">
                            <img
                                src={imgLogin}
                                aria-label="img Register"
                                width="600"
                                height="100%"
                                className="object-container"
                            ></img>
                        </div>
                        <div className="border-[1px] border-black border-solid bg-white w-[30%]">
                            <div className="mt-5">
                                <h3 className="font-['Irish_Grover'] text-[25px] not-italic">
                                    TÀI KHOẢN
                                </h3>
                            </div>
                            <div id="recaptcha-container"></div>
                            <div className="flex justify-content-center py-3 ">
                                <Link
                                    to={`/${path.LOGIN}`}
                                    className="border-black border-[1px] border-solid rounded-[10px]"
                                >
                                    <input
                                        type="button"
                                        id="btnLogin"
                                        defaultValue={"Đăng nhập"}
                                        onClick={this.LoginForm}
                                        className="px-2 "
                                    />
                                </Link>
                                <Link
                                    to={`/${path.REGISTER}`}
                                    className="border-black border-[1px] border-solid rounded-[10px]"
                                >
                                    <input
                                        type="button"
                                        id="btnRegister"
                                        defaultValue={"Đăng ký"}
                                        className="px-2"
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

                            {/* Form register */}
                            <form
                                id="formRegister"
                                onSubmit={this.handleSubmitRegister}
                            >
                                <div className="formPhone row">
                                    <div className="fname col-6">
                                        <label htmlFor="name">Họ</label>
                                        <br />
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            name="firstname"
                                            id="firstname"
                                            onChange={this.handleChangeRegister}
                                            className="border-black border-[1px] border-solid rounded-[10px] bg-white text-black w-[75%]"
                                        />
                                        {errors.fname && (
                                            <div
                                                id="validationFName"
                                                className="alert alert-danger"
                                            >
                                                {errors.fname}
                                            </div>
                                        )}
                                    </div>
                                    <div className="lname col-6">
                                        <label htmlFor="name">Tên</label>
                                        <br />
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            name="lastname"
                                            id="lastname"
                                            onChange={this.handleChangeRegister}
                                            className="border-black border-[1px] border-solid rounded-[10px] bg-white text-black w-[75%]"
                                        />
                                        {errors.lname && (
                                            <div
                                                id="validationLName"
                                                className="alert alert-danger"
                                            >
                                                {errors.lname}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="formPhone">
                                    <label htmlFor="phone2">
                                        Số điện thoại
                                    </label>
                                    <br />
                                    <div className="verifyphone row mr-2">
                                        <input
                                            type="text"
                                            id="phone2"
                                            name="phone2"
                                            placeholder="0326687233"
                                            onChange={this.handleChangeRegister}
                                            className="col border-black border-[1px] border-solid rounded-[10px] bg-white text-black w-[75%]"
                                        />
                                        {this.state.buttonVerify ? (
                                            <input
                                                type="button"
                                                id="btn-verify"
                                                className="d-flex justify-content-center col-4"
                                                defaultValue={
                                                    this.state.verified
                                                        ? "Verified"
                                                        : "Verify"
                                                }
                                                onClick={this.onSignInSubmit}
                                            />
                                        ) : null}
                                    </div>
                                    {errors.verify && (
                                        <div
                                            id="validationPhone2"
                                            className="alert alert-danger"
                                        >
                                            {errors.verify}
                                        </div>
                                    )}
                                    {errors.phone2 && (
                                        <div
                                            id="validationPhone2"
                                            className="alert alert-danger"
                                        >
                                            {errors.phone2}
                                        </div>
                                    )}
                                </div>

                                {this.state.verifyOtp ? (
                                    <div className="formPhone">
                                        <label htmlFor="otp">Mã OTP</label>
                                        <br />
                                        <div className="verifyphone row">
                                            <input
                                                type="text"
                                                id="otp"
                                                name="otp"
                                                className="col border-black border-[1px] border-solid rounded-[10px] bg-white text-black w-[75%]"
                                                placeholder="Nhập OTP"
                                                onChange={
                                                    this.handleChangeRegister
                                                }
                                            />
                                            <input
                                                type="button"
                                                className="flex justify-content-center col-4  border-black border-[1px] border-solid rounded-[10px]"
                                                defaultValue={"OTP"}
                                                onClick={this.verifyCode}
                                            />
                                        </div>
                                    </div>
                                ) : null}

                                <div className="formPhone">
                                    <label htmlFor="password2">Mật khẩu</label>
                                    <br />
                                    <input
                                        type="password"
                                        id="password2"
                                        name="password2"
                                        placeholder="**********"
                                        onChange={this.handleChangeRegister}
                                        className="border-black border-[1px] border-solid rounded-[10px] bg-white text-black w-[75%]"
                                    />
                                    {errors.password2 && (
                                        <div
                                            id="validationPassword2"
                                            className="alert alert-danger"
                                        >
                                            {errors.password2}
                                        </div>
                                    )}
                                </div>
                                <div className="formPhone">
                                    <label htmlFor="repassword">
                                        Nhập lại mật khẩu
                                    </label>
                                    <br />
                                    <input
                                        type="password"
                                        id="repassword"
                                        name="repassword"
                                        placeholder="**********"
                                        onChange={this.handleChangeRegister}
                                        className="border-black border-[1px] border-solid rounded-[10px] bg-white text-black w-[75%]"
                                    />
                                    {errors.repassword && (
                                        <div
                                            id="validationRePassword"
                                            className="alert alert-danger"
                                        >
                                            {errors.repassword}
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-content-center py-3">
                                    <button type="submit" id="submitRegister">
                                        Đăng ký
                                    </button>
                                </div>
                                <div className="aRegister">
                                    Bạn đã có tài khoản?
                                    <Link
                                        to={`/${path.LOGIN}`}
                                        className="text-cyan-500"
                                    >
                                        Đăng nhập
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

export default Register;
