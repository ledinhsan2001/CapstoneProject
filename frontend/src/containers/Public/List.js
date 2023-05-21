import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Item } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { realHomeLimit } from "../../store/actions/realHome";
import * as actions from "../../store/actions";
import ReactPaginate from "react-paginate";
import {
    useNavigate,
    createSearchParams,
    useSearchParams,
    useLocation,
} from "react-router-dom";

const List = ({ transaction_type_id, real_home_type_id }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(0);
    const dispatch = useDispatch();

    //useSelector state.real_homes chọc đúng state real_homeReducer
    const { real_homes, page_count, message } = useSelector(
        (state) => state.real_home
    );
    useEffect(() => {
        let page_value = params.get("page");
        let price = params.get("gia");
        let area = params.get("dien_tich");
        let page = page_value ? +page_value - 1 : 0;
        let code = price ? price : area ? area : undefined;
        let type = price ? "price" : area ? "area" : undefined;

        dispatch(
            realHomeLimit({
                real_home_type_id,
                transaction_type_id,
                page,
                [type]: code,
            })
        );
        dispatch(actions.realHomeTypes());
        setCurrentPage(+page);
    }, [dispatch, params, real_home_type_id, transaction_type_id]);

    function handlePageClick(e) {
        let price = params.get("gia");
        let area = params.get("dien_tich");

        let code = price ? price : area ? area : undefined;
        let type = price ? "gia" : area ? "dien_tich" : undefined;

        type
            ? navigate({
                  pathname: location.pathname,
                  search: createSearchParams({
                      [type]: code,
                      page: e.selected + 1,
                  }).toString(),
              })
            : navigate({
                  pathname: location.pathname,
                  search: createSearchParams({
                      page: e.selected + 1,
                  }).toString(),
              });
    }

    return (
        <div className="main w-[100%]">
            <div className="titleSort">
                {transaction_type_id === "645b56517cc26519dbcaad34" ? (
                    <h6 className="titleh6 text-left mb-1">
                        137.022 tin mua bán nhà đất ở toàn quốc
                    </h6>
                ) : (
                    <h6 className="titleh6 text-left mb-1">
                        26.146 tin cho thuê nhà đất ở toàn quốc
                    </h6>
                )}

                <div className="btnSort flex items-center">
                    <span>Sắp xếp:</span>
                    <Button text={"Mặc định"} />
                    <Button text={"Tin mới"} />
                    <Button text={"Giá cao"} />
                    <Button text={"Giá thấp"} />
                </div>
            </div>
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
                                content={item?.description.content_description}
                                user={item?.user_post}
                                _id={item?._id}
                            />
                        );
                    })}
            </div>
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
        </div>
    );
};
export default List;
