import React from "react";
import { Link } from "react-router-dom";
import "./LinkNavigate.css";

const LinkNavigate = ({ text, icon, url }) => {
    return (
        <div className="linknav p-2 justify-center">
            <Link to={`/url`}>
                {text}
                {icon}
            </Link>
        </div>
    );
};

export default LinkNavigate;
