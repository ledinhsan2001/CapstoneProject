import React, { memo } from "react";
import "./SearchItem.css";
import "bootstrap/dist/css/bootstrap.min.css";

//memo khi na prop change thì mới render còn không thì không thay đổi
// k có memo thg cha thay đổi thì thg con cũng thay đổi bất chấp
function SearchItem({ beforeIcon, text, icon }) {
    return (
        <div className="Search-item p-2 mb-1 ">
            {beforeIcon}
            <span className="span">{text}</span>
            {icon}
        </div>
    );
}

export default memo(SearchItem);
