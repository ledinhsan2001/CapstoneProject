import React from "react";
//Outlet đại diện route con cho Route mẹ. Khi có các route lồng nhau
// import  { Outlet } from "react-router-dom";
import "./Home.css";
import Search from "./Search";
import { title } from "../../utils/constant";
import "bootstrap/dist/css/bootstrap.min.css";
import { LinkNavigate } from "../components";
import icons from "../../utils/icons";

const { IoIosArrowForward } = icons;

const Home = () => {
    return (
        <div className="row">
            <Search></Search>

            <div className="column middle">
                <h5
                    style={{
                        color: "black",
                        fontFamily: "auto",
                        marginTop: "4px",
                    }}
                >
                    <b>{title.HeaderMain}</b>
                </h5>
                <div className="column-main">
                    <div className="column-main-side">
                        <div className="sale">
                            <img src="sale.png" alt="sale"></img>
                            {title.titleSale}
                        </div>
                        <div className="btn-sale">
                            <div className="sale1">
                                <LinkNavigate
                                    text="linknavigate"
                                    icon={<IoIosArrowForward color="red" />}
                                />
                                <LinkNavigate
                                    text="linknavigate"
                                    icon={<IoIosArrowForward color="red" />}
                                />
                                <LinkNavigate
                                    text="linknavigate"
                                    icon={<IoIosArrowForward color="red" />}
                                />
                                <LinkNavigate
                                    text="linknavigate"
                                    icon={<IoIosArrowForward color="red" />}
                                />
                                <LinkNavigate
                                    text="linknavigate"
                                    icon={<IoIosArrowForward color="red" />}
                                />
                            </div>
                            <div className="sale2">
                                <LinkNavigate
                                    text="linknavigate"
                                    icon={<IoIosArrowForward color="red" />}
                                />
                                <LinkNavigate
                                    text="linknavigate"
                                    icon={<IoIosArrowForward color="red" />}
                                />
                                <LinkNavigate
                                    text="linknavigate"
                                    icon={<IoIosArrowForward color="red" />}
                                />
                                <LinkNavigate
                                    text="linknavigate"
                                    icon={<IoIosArrowForward color="red" />}
                                />
                                <LinkNavigate
                                    text="linknavigate"
                                    icon={<IoIosArrowForward color="red" />}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="column-main-side">
                        <div className="rental">
                            <img src="rental.png" alt="sale"></img>
                            {title.titleRental}
                        </div>
                        <div className="btn-rental"></div>
                    </div>
                </div>
            </div>

            <div className="column side">
                <h2>Column</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas sit amet pretium urna. Vivamus venenatis velit nec
                    neque ultricies, eget elementum magna tristique. Quisque
                    vehicula, risus eget aliquam placerat, purus leo tincidunt
                    eros, eget luctus quam orci in velit. Praesent scelerisque
                    tortor sed accumsan convallis.
                </p>
            </div>
        </div>
    );
};

export default Home;
