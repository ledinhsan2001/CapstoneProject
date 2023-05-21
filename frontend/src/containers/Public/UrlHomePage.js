import React from "react";
import { LinkNavigate } from "../components";
import icons from "../../utils/icons";
import { title } from "../../utils/constant";
import SaleImg from "../../assets/images/sale.png";
import ReantalImg from "../../assets/images/rental.png";
import "./UrlHomePage.css";
import { useSelector } from "react-redux";

const { IoIosArrowForward } = icons;

const UrlHomePage = () => {
    const { real_home_types_bs, real_home_types_r } = useSelector(
        (state) => state.real_home_type
    );

    return (
        <>
            <div className="column-main-side w-[50%]">
                <div className="sale">
                    <img src={SaleImg} alt="sale"></img>
                    {title.titleSale}
                </div>
                <div className="btn-sale pb-2 w-[100%] border-[1px] border-solid border-black justify-evenly overflow-hidden textflow-ellipsis whitespace-pre-line">
                    <div className="sale1 mt-[5%] w-[100%] h-[220px] flex flex-wrap flex-wrap overflow-hidden text-ellipsis whitespace-nowrap text-start ml-[5%]">
                        {real_home_types_bs?.length > 0 &&
                            real_home_types_bs.map((item) => {
                                return (
                                    <div className="w-[50%]" key={item._id}>
                                        <LinkNavigate
                                            text={item.name}
                                            icon={
                                                <IoIosArrowForward color="red" />
                                            }
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>

            <div className="column-main-side w-[50%]">
                <div className="rental">
                    <img src={ReantalImg} alt="rental"></img>
                    {title.titleRental}
                </div>
                <div className="btn-rental flex pb-2 w-[100%] border-[1px] border-solid border-black justify-evenly">
                    <div className="sale1 mt-[5%] w-[100%] h-[220px] flex flex-wrap overflow-hidden text-ellipsis whitespace-nowrap text-start ml-[5%]">
                        {real_home_types_r?.length > 0 &&
                            real_home_types_r.map((item) => {
                                return (
                                    <div className="w-[50%]" key={item._id}>
                                        <LinkNavigate
                                            text={item.name}
                                            icon={
                                                <IoIosArrowForward color="red" />
                                            }
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
};
export default UrlHomePage;
