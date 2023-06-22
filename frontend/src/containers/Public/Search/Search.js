import React, { useCallback, useState } from "react";
import { SelectSearchForm, SearchItem } from "../../components";
import icons from "../../../utils/icons";
import { path, title } from "../../../utils/constant";
import { useSelector } from "react-redux";
import {
    createSearchParams,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import { useEffect } from "react";

const {
    AiOutlineDown,
    BsSearch,
    BiMap,
    TbHomeDollar,
    BiBuildingHouse,
    FaTradeFederation,
    AiOutlineAreaChart,
} = icons;
const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { prices, areas } = useSelector((state) => state.price_area);
    const { real_home_types_bs, real_home_types_r, transaction_types } =
        useSelector((state) => state.real_home);

    const [isShowForm, setIsShowForm] = useState(false);
    const [content, setContent] = useState([]);
    const [text, setText] = useState("");
    const [name, setName] = useState("");
    const [rental, setrental] = useState("");
    const [arrmaxmin, setarrmaxmin] = useState({});
    const [queries, setqueries] = useState({});
    const [params] = useSearchParams();

    useEffect(() => {
        if (location.pathname !== `/${path.SEARCH}`) {
            setarrmaxmin({});
            setqueries({});
        }
    }, [location]);

    const handleForm = (content, text, name, type_rental) => {
        setContent(content);
        setText(text);
        setName(name);
        setrental(type_rental);
        setIsShowForm(true);
    };

    const handleSubmit = useCallback(
        (e, query, arrmaxmin) => {
            e.stopPropagation();
            setIsShowForm(false);
            setqueries((prev) => ({ ...prev, ...query }));
            setarrmaxmin((prev) => ({ ...prev, ...arrmaxmin }));
        },
        [isShowForm, queries]
    );

    const submitSearch = () => {
        //get cac id from search(name and name_id)
        const arr_search = Object.entries(queries).filter((item) =>
            item[0].includes("_id")
        );
        let arr_search_id = {};
        let drop_id_null = arr_search.filter((item) => item[1] !== null);
        // [] => {}
        drop_id_null.map((item) => (arr_search_id[item[0]] = item[1]));

        //get cac name from search to show title page search data
        let title_search = "";
        let obj_search = {};
        const arr_search_name = Object.entries(queries).filter(
            (item) => !item[0].includes("_id")
        );
        let drop_name_null = arr_search_name.filter(
            (item) =>
                item[1] !== "--- Giao dịch ---" &&
                item[1] !== "--- Loại nhà đất ---" &&
                item[1] !== "--- Khu vực ---" &&
                item[1] !== "--- Chọn mức giá ---" &&
                item[1] !== "--- Diện tích ---"
        );
        drop_name_null.map((item) => (obj_search[item[0]] = item[1]));
        const exist_category =
            obj_search.transaction_type || obj_search.real_home_type
                ? true
                : false;
        if (exist_category) {
            for (let i in obj_search) {
                title_search += `${obj_search[i]}, `;
            }
        } else {
            // only have price, area, province
            title_search = "Bất động sản ";
            for (let i in obj_search) {
                title_search += `${obj_search[i]}, `;
            }
        }
        if (Object.entries(arr_search_id).length > 0) {
            navigate(
                {
                    pathname: `/${path.SEARCH}`,
                    search: createSearchParams(arr_search_id).toString(),
                },
                { state: { title_search } }
            );
        } else {
            navigate({
                pathname: `/`,
            });
        }
    };

    return (
        <>
            <div className="search flex flex-col gap-3 w-[19.3%] max-h-[470px] bg-white items-center justify-center">
                <div>
                    <h4 className="text-blue-700 font-['inherit'] mt-[4px]">
                        <b>{title.HeaderSearch}</b>
                    </h4>
                </div>
                <div className="Search-class flex flex-col items-center justify-center max-h-[900px] p-[3%] bg-[#febb02] rounded-xl overflow-hidden text-ellipsis whitespace-nowrap w-[80%] ">
                    <span
                        className="h-[30%] w-[80%]"
                        onClick={() => {
                            handleForm(
                                transaction_types,
                                "--- Giao dịch ---",
                                "transaction_type"
                            );
                        }}
                    >
                        <SearchItem
                            beforeIcon={<FaTradeFederation />}
                            text={queries.transaction_type}
                            textDefault="--- Giao dịch ---"
                            icon={<AiOutlineDown />}
                        />
                    </span>
                    <span
                        className="h-[30%] w-[80%]"
                        onClick={() => {
                            queries.transaction_type === "Cho thuê"
                                ? handleForm(
                                      real_home_types_r,
                                      "--- Loại nhà đất ---",
                                      "real_home_type"
                                  )
                                : handleForm(
                                      real_home_types_bs,
                                      "--- Loại nhà đất ---",
                                      "real_home_type"
                                  );
                        }}
                    >
                        <SearchItem
                            beforeIcon={<BiBuildingHouse />}
                            text={queries.real_home_type}
                            textDefault="--- Loại nhà đất ---"
                            icon={<AiOutlineDown />}
                        />
                    </span>
                    <span
                        className="h-[30%] w-[80%]"
                        onClick={() => {
                            handleForm(
                                "Khu vuc",
                                "--- Khu vực ---",
                                "province"
                            );
                        }}
                    >
                        <SearchItem
                            beforeIcon={<BiMap />}
                            text={queries.province}
                            textDefault="--- Khu vực ---"
                            icon={<AiOutlineDown />}
                        />
                    </span>
                    <span
                        className="h-[30%] w-[80%]"
                        onClick={() => {
                            queries.transaction_type === "Cho thuê"
                                ? handleForm(
                                      prices.slice(8, 16),
                                      "--- Chọn mức giá ---",
                                      "price",
                                      "rental"
                                  )
                                : handleForm(
                                      prices.slice(0, 8),
                                      "--- Chọn mức giá ---",
                                      "price"
                                  );
                        }}
                    >
                        <SearchItem
                            beforeIcon={<TbHomeDollar />}
                            text={queries.price}
                            textDefault="--- Chọn mức giá ---"
                            icon={<AiOutlineDown />}
                        />
                    </span>
                    <span
                        className="h-[30%] w-[80%]"
                        onClick={() => {
                            handleForm(areas, "--- Diện tích ---", "area");
                        }}
                    >
                        <SearchItem
                            beforeIcon={<AiOutlineAreaChart />}
                            text={queries.area}
                            textDefault="--- Diện tích ---"
                            icon={<AiOutlineDown />}
                        />
                    </span>
                    <button
                        className="overflow-hidden text-ellipsis whitespace-nowrap text-white text-lg bg-[#5BBF38] mt-2 p-1 h-[90px] w-[40%] rounded-xl flex items-center hover:drop-shadow-2xl"
                        onClick={submitSearch}
                    >
                        <BsSearch size={50} />
                        Tìm kiếm
                    </button>
                </div>
            </div>
            {isShowForm && (
                <SelectSearchForm
                    setIsShowForm={setIsShowForm}
                    content={content}
                    text={text}
                    name={name}
                    handleSubmit={handleSubmit}
                    queries={queries}
                    rental={rental}
                    arrmaxmin={arrmaxmin}
                />
            )}
        </>
    );
};

export default Search;
