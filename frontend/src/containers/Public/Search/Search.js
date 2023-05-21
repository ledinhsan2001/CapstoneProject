import React from "react";
// import "./Search.css";
import SearchItem from "../../components/SearchItem";
import icons from "../../../utils/icons";
import "bootstrap/dist/css/bootstrap.min.css";

import { title } from "../../../utils/constant";

const {
    AiOutlineDown,
    BsSearch,
    BiMap,
    TbHomeDollar,
    BiBuildingHouse,
    FaTradeFederation,
    AiOutlineAreaChart,
} = icons;
function Search() {
    return (
        <div className="flex flex-col gap-3 w-[20%] max-h-[470px] bg-white items-center justify-center">
            <div>
                <h4
                    style={{
                        color: "blue",
                        fontFamily: "inherit",
                        marginTop: "4px",
                    }}
                >
                    <b>{title.HeaderSearch}</b>
                </h4>
            </div>
            <div className="Search-class flex flex-col items-center justify-center max-h-[900px] p-[3%] bg-[#febb02] rounded-xl overflow-hidden text-ellipsis whitespace-nowrap w-[80%] ">
                <SearchItem
                    beforeIcon={<FaTradeFederation />}
                    text="--- Giao dịch ---"
                    icon={<AiOutlineDown />}
                />
                <SearchItem
                    beforeIcon={<BiBuildingHouse />}
                    text="--- Loại nhà đất ---"
                    icon={<AiOutlineDown />}
                />
                <SearchItem
                    beforeIcon={<BiMap />}
                    text="--- Khu vực ---"
                    icon={<AiOutlineDown />}
                />
                <SearchItem
                    beforeIcon={<AiOutlineAreaChart />}
                    text="--- Diện tích ---"
                    icon={<AiOutlineDown />}
                />
                <SearchItem
                    beforeIcon={<TbHomeDollar />}
                    text="--- Chọn mức giá ---"
                    icon={<AiOutlineDown />}
                />
                <button className="overflow-hidden text-ellipsis whitespace-nowrap text-white text-lg bg-[#5BBF38] mt-2 p-1 h-[100px] w-[40%] border-[1px] border-solid border-gray rounded-xl flex items-center">
                    <BsSearch size={50} />
                    Tìm kiếm
                </button>
            </div>
        </div>
    );
}

export default Search;
