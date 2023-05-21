import React, { memo } from "react";
import icons from "../../utils/icons";
import { formatUniToString } from "../../utils/constant";
import {
    Link,
    useLocation,
    useNavigate,
    createSearchParams,
    useSearchParams,
} from "react-router-dom";

const { IoIosArrowForward } = icons;

const ItemSidebarMain = ({
    title,
    data_link,
    isDouble,
    price,
    type,
    home,
    transaction_type,
}) => {
    data_link =
        price && !home && !transaction_type
            ? data_link.slice(0, 8)
            : transaction_type
            ? data_link.slice(8, 16)
            : data_link;

    const navigate = useNavigate();
    const location = useLocation();
    const [params] = useSearchParams();

    const handleFilter = (code) => {
        navigate({
            pathname: location.pathname,
            search: createSearchParams({
                [type]: code,
            }).toString(),
        });
    };

    return (
        <div className="m-2 p-3 w-full bg-white">
            <h3 className="text-lg font-semibold">{title}</h3>
            {/* Danh sách mua bán */}
            {!isDouble &&
                data_link?.length > 0 &&
                data_link.map((item) => {
                    return (
                        <Link
                            to={`/${formatUniToString(item.name)}`}
                            className="flex items-center m-3 hover:text-orange-400 cursor-pointer border-b border-gray-300 border-dashed text-sm"
                            key={item._id}
                        >
                            <IoIosArrowForward
                                size={15}
                                color="text-gray-300"
                                className="mr-2"
                            />
                            <p>{item.name}</p>
                        </Link>
                    );
                })}

            {/*  Xem theo diện tích*/}
            {isDouble && !price && (
                <div className=" flex flex-wrap">
                    {data_link?.length > 0 &&
                        data_link.map((item) => {
                            return (
                                <div
                                    onClick={() => handleFilter(item._id)}
                                    className="flex items-center my-2 hover:text-orange-400 cursor-pointer border-b border-gray-300 border-dashed text-xs text-start overflow-hidden textflow-ellipsis whitespace-pre-line w-[47%] pb-1"
                                    key={item._id}
                                >
                                    <IoIosArrowForward
                                        size={15}
                                        color="text-gray-300"
                                    />
                                    <p>{item.name}</p>
                                </div>
                            );
                        })}
                </div>
            )}
            {/* Xem theo giá */}
            {isDouble && price && (
                <div className=" flex flex-wrap">
                    {data_link?.length > 0 &&
                        data_link.map((item) => {
                            return (
                                <div
                                    onClick={() => handleFilter(item._id)}
                                    key={item._id}
                                    className="flex items-center my-2 hover:text-orange-400 cursor-pointer border-b border-gray-300 border-dashed text-xs text-start overflow-hidden textflow-ellipsis whitespace-pre-line w-[47%] pb-1"
                                >
                                    <IoIosArrowForward
                                        size={15}
                                        color="text-gray-300"
                                    />
                                    <p>{item.name}</p>
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
};

export default memo(ItemSidebarMain);
