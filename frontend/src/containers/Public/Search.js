import React from "react";
import "./Search.css";
import SearchItem from "../components/SearchItem";
import icons from "../../utils/icons";
import "bootstrap/dist/css/bootstrap.min.css";

import { title } from "../../utils/constant";

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
        <div
            className="column side flex flex-col gap-3"
            style={{ marginLeft: "0.5%" }}
        >
            <div>
                <h4
                    style={{
                        color: "blue",
                        fontFamily: "inherit",
                        marginTop: "4px",
                    }}
                >
                    {title.HeaderSearch}
                </h4>
            </div>
            <div className="Search-class flex flex-col items-center justify-center">
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
                <button className="btn-Search">
                    <BsSearch style={{ marginBottom: "2%" }} />
                    Tìm kiếm
                </button>
            </div>
        </div>
    );
}

export default Search;
