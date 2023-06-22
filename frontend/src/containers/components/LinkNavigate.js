import React from "react";
import { Link } from "react-router-dom";
import { formatUniToString } from "../../utils/constant";

const LinkNavigate = ({ text, icon, className }) => {
    return (
        <>
            {className && (
                <div className="linknav p-2 mx-2 justify-center max-h-[45px] w-[195px] text-start">
                    <Link
                        to={`/${formatUniToString(text)}`}
                        className="items-center inline-flex hover:translate-x-3 hover:text-blue-500"
                    >
                        {icon}
                        {text}
                    </Link>
                </div>
            )}
            {!className && (
                <div className="linknav p-2 mx-4 justify-center max-h-[45px]">
                    <Link
                        to={`/${formatUniToString(text)}`}
                        className="items-center inline-flex hover:translate-x-3 hover:text-blue-500"
                    >
                        {icon}
                        {text}
                    </Link>
                </div>
            )}
        </>
    );
};

export default LinkNavigate;
