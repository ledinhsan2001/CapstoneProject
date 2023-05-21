import React, { memo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

//memo khi na prop change thì mới render còn không thì không thay đổi
// k có memo thg cha thay đổi thì thg con cũng thay đổi bất chấp
function SearchItem({ beforeIcon, text, icon }) {
    return (
        <div className="p-2 mb-1 bg-white text-gray h-[30%] w-[80%] border-[1px] border-solid border-black rounded-xl flex justify-between cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap items-center">
            {beforeIcon}
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {text}
            </span>
            {icon}
        </div>
    );
}

export default memo(SearchItem);
