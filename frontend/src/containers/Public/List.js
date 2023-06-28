import React, { useEffect, useState, memo } from "react";
import { Item } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { realHomeLimit } from "../../store/actions/realHome";
import ReactPaginate from "react-paginate";
import {
    useNavigate,
    createSearchParams,
    useSearchParams,
    useLocation,
} from "react-router-dom";

const List = ({ transaction_type_id, real_home_type_id, arr_search }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(0);
    const [sortActive, setsortActive] = useState(0);
    const dispatch = useDispatch();
    //useSelector state.real_homes chọc đúng state real_homeReducer
    const { real_homes, page_count, message, total_data, saved_post } =
        useSelector((state) => state.real_home);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [arrSavedPostId, setarrSavedPostId] = useState([]);

    useEffect(() => {
        if (isLoggedIn) {
            let arr = [];
            saved_post?.map((item) => arr.push(item?.real_home?._id));
            setarrSavedPostId(arr);
        }
        // eslint-disable-next-line
    }, [saved_post]);

    useEffect(() => {
        let page_value = params.get("page");
        let price = params.get("price_id");
        let area = params.get("area_id");
        // let province = params.get("province_id");

        let page = page_value ? +page_value - 1 : 0;
        let code = price ? price : area ? area : undefined;
        let type = price ? "price_id" : area ? "area_id" : undefined;

        // if have sort
        let sort = params.get("sort_id");
        let sort_code = sort ? sort : undefined;
        let sort_type = sort ? "sort_id" : undefined;

        // if have filter
        let news_type = params.get("news_type_id");
        let news_type_code = news_type ? news_type : undefined;
        let news_type_type = news_type ? "news_type_id" : undefined;

        if (arr_search) {
            arr_search["page"] = page;
            if (sort) {
                arr_search["sort_id"] = sort;
            }
        }

        arr_search
            ? dispatch(realHomeLimit(arr_search))
            : dispatch(
                  realHomeLimit({
                      page,
                      transaction_type_id,
                      real_home_type_id,
                      [type]: code,
                      [sort_type]: sort_code,
                      [news_type_type]: news_type_code,
                  })
              );
        setCurrentPage(+page);
    }, [params, real_home_type_id, transaction_type_id, arr_search, dispatch]);

    function handlePageClick(e) {
        let price = params.get("price_id");
        let area = params.get("area_id");
        // let province = params.get("province_id");

        let code = price ? price : area ? area : undefined;
        let type = price ? "price_id" : area ? "area_id" : undefined;

        // if have sort
        let sort = params.get("sort_id");
        let sort_code = sort ? sort : undefined;
        let sort_type = sort ? "sort_id" : undefined;

        // if have filter
        let news_type = params.get("news_type_id");
        let news_type_code = news_type ? news_type : undefined;
        let news_type_type = news_type ? "news_type_id" : undefined;

        if (arr_search) {
            arr_search["page"] = e.selected + 1;
            if (sort) {
                arr_search["sort_id"] = sort;
            }
            if (news_type) {
                arr_search["news_type_id"] = news_type;
            }
        }

        let objparams = {};
        if (type) {
            objparams[type] = code;
        }
        if (sort) {
            objparams[sort_type] = sort_code;
        }
        if (news_type) {
            objparams[news_type_type] = news_type_code;
        }
        objparams["page"] = e.selected + 1;

        arr_search
            ? navigate({
                  pathname: location.pathname,
                  search: createSearchParams(arr_search).toString(),
              })
            : type
            ? navigate({
                  pathname: location.pathname,
                  search: createSearchParams(objparams).toString(),
              })
            : navigate({
                  pathname: location.pathname,
                  search: createSearchParams(objparams).toString(),
              });
    }

    const handleSort = (value) => {
        setsortActive(value);

        let price = params.get("price_id");
        let area = params.get("area_id");
        // let province = params.get("province_id");

        let code = price ? price : area ? area : undefined;
        let type = price ? "price_id" : area ? "area_id" : undefined;

        let sort_code = value;
        let sort_type = "sort_id";

        let news_type = params.get("news_type_id");
        let news_type_code = news_type ? news_type : undefined;
        let news_type_type = news_type ? "news_type_id" : undefined;

        if (arr_search) {
            arr_search["page"] = 1;
            arr_search[sort_type] = sort_code;
            if (news_type) {
                arr_search[news_type_type] = news_type_code;
            }
        }

        let objparams = {};
        if (type) {
            objparams[type] = code;
        }
        objparams[sort_type] = sort_code;
        if (news_type) {
            objparams[news_type_type] = news_type_code;
        }
        objparams["page"] = 1;

        arr_search
            ? navigate({
                  pathname: location.pathname,
                  search: createSearchParams(arr_search).toString(),
              })
            : type
            ? navigate({
                  pathname: location.pathname,
                  search: createSearchParams(objparams).toString(),
              })
            : navigate({
                  pathname: location.pathname,
                  search: createSearchParams(objparams).toString(),
              });
    };

    const handleFilter = (value) => {
        let price = params.get("price_id");
        let area = params.get("area_id");
        let sort = params.get("sort_id");
        // let province = params.get("province_id");

        let code = price ? price : area ? area : undefined;
        let type = price ? "price_id" : area ? "area_id" : undefined;

        let sort_code = sort;
        let sort_type = "sort_id";

        let news_type_code;
        let news_type_type;
        if (value !== 4) {
            news_type_code = value;
            news_type_type = "news_type_id";
        }

        if (arr_search) {
            arr_search["page"] = 1;
            if (value !== 4) {
                arr_search[news_type_type] = news_type_code;
            }
            if (sort) {
                arr_search[sort_type] = sort_code;
            }
        }

        let objparams = {};
        if (type) {
            objparams[type] = code;
        }
        if (value !== 4) {
            objparams[news_type_type] = news_type_code;
        }
        if (sort) {
            objparams[sort_type] = sort_code;
        }
        objparams["page"] = 1;

        arr_search
            ? navigate({
                  pathname: location.pathname,
                  search: createSearchParams(arr_search).toString(),
              })
            : type
            ? navigate({
                  pathname: location.pathname,
                  search: createSearchParams(objparams).toString(),
              })
            : navigate({
                  pathname: location.pathname,
                  search: createSearchParams(objparams).toString(),
              });
    };

    return (
        <div className="main w-[100%]">
            <div className="titleSort">
                <div className="titleh6 text-left mb-1">
                    <b>{total_data}</b> tin cho thuê nhà đất ở toàn quốc
                </div>

                <div className="flex justify-between">
                    <div className="btnSort flex items-center">
                        <span>Sắp xếp:</span>
                        <span
                            className={`mx-1 my-1 p-1 rounded-md ${
                                sortActive === 0
                                    ? `bg-blue-700 text-white`
                                    : `bg-gray-300`
                            } hover:bg-blue-700 hover:text-white cursor-pointer`}
                            onClick={() => handleSort(0)}
                        >
                            Mặc định
                        </span>
                        <span
                            className={`mx-1 my-1 p-1 rounded-md ${
                                sortActive === 1
                                    ? `bg-blue-700 text-white`
                                    : `bg-gray-300`
                            } hover:bg-blue-700 hover:text-white cursor-pointer`}
                            onClick={() => handleSort(1)}
                        >
                            Tin mới
                        </span>
                        <span
                            className={`mx-1 my-1 p-1 rounded-md ${
                                sortActive === 2
                                    ? `bg-blue-700 text-white`
                                    : `bg-gray-300`
                            } hover:bg-blue-700 hover:text-white cursor-pointer`}
                            onClick={() => handleSort(2)}
                        >
                            Diện tích tăng
                        </span>
                        <span
                            className={`mx-1 my-1 p-1 rounded-md ${
                                sortActive === 3
                                    ? `bg-blue-700 text-white`
                                    : `bg-gray-300`
                            } hover:bg-blue-700 hover:text-white cursor-pointer`}
                            onClick={() => handleSort(3)}
                        >
                            Diện tích giảm
                        </span>
                    </div>
                    <div className=" flex items-center text-left">
                        <p className="mr-2">Lọc loại tin:</p>
                        <select
                            className=" h-[34px] w-[150px] p-1 my-1 rounded-xl border-solid border-1 border-black hover:bg-white hover:text-black hover:border-solid hover:border-2 hover:border-blue-300 cursor-pointer"
                            onChange={(e) => handleFilter(+e.target.value)}
                        >
                            <option
                                className="text-red-500 font-bold"
                                value={4}
                            >
                                Mặc định
                            </option>
                            <option
                                className="text-red-500 font-bold"
                                value={0}
                            >
                                Tin đặc biệt
                            </option>
                            <option
                                className="text-[#ED0CC9] font-bold"
                                value={1}
                            >
                                Tin đặc sắc
                            </option>
                            <option
                                className="text-blue-500 font-bold"
                                value={2}
                            >
                                Tin thường
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            {isLoggedIn && (
                <div className="items">
                    {message && <div className="bg-white">{message}</div>}
                    {arrSavedPostId.length > 0 &&
                        real_homes.length > 0 &&
                        real_homes.map((item) => {
                            return (
                                <Item
                                    key={item._id}
                                    images={JSON.parse(item?.images.url)}
                                    shortDescription={
                                        item?.description.title_description
                                    }
                                    price={item?.description.price}
                                    area={item?.description.area}
                                    bedroom={item?.description.bedroom}
                                    toilet={item?.description.toilet}
                                    address={item?.address}
                                    content={
                                        item?.description.content_description
                                    }
                                    user={item?.user_post}
                                    _id={item?._id}
                                    upAt={item.createdAt}
                                    active={
                                        arrSavedPostId.includes(item._id)
                                            ? "active"
                                            : ""
                                    }
                                    news_type_id={item?.news_type_id}
                                />
                            );
                        })}
                </div>
            )}
            {!isLoggedIn && (
                <div className="items">
                    {message && <div className="bg-white">{message}</div>}
                    {real_homes.length > 0 &&
                        real_homes.map((item) => {
                            return (
                                <Item
                                    key={item._id}
                                    images={JSON.parse(item?.images.url)}
                                    shortDescription={
                                        item?.description.title_description
                                    }
                                    price={item?.description.price}
                                    area={item?.description.area}
                                    bedroom={item?.description.bedroom}
                                    toilet={item?.description.toilet}
                                    address={item?.address}
                                    content={
                                        item?.description.content_description
                                    }
                                    user={item?.user_post}
                                    _id={item?._id}
                                    upAt={item.createdAt}
                                    news_type_id={item?.news_type_id}
                                />
                            );
                        })}
                </div>
            )}
            {real_homes.length > 0 && (
                <div className="mt-2 w-[100%]">
                    <ReactPaginate
                        className=""
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={page_count}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        marginPagesDisplayed={1}
                        containerClassName="pagination justify-content-center"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        activeClassName="active"
                        forcePage={currentPage}
                    />
                </div>
            )}
        </div>
    );
};
export default memo(List);
