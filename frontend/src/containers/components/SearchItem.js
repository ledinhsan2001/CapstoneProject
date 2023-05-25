import React, { memo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

//memo khi na prop change thì mới render còn không thì không thay đổi
// k có memo thg cha thay đổi thì thg con cũng thay đổi bất chấp
function SearchItem({ beforeIcon, text, textDefault, icon }) {
    return (
        <div
            className={`p-2 mb-1 bg-white ${
                text ? `text-black ` : `text-gray-500`
            }  rounded-xl flex justify-between cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap items-center hover:drop-shadow-2xl`}
        >
            {beforeIcon}
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {text === textDefault ? (
                    textDefault
                ) : text ? (
                    <b>{text}</b>
                ) : (
                    textDefault
                )}
            </span>
            {icon}
        </div>
    );
}

export default memo(SearchItem);
