import React from "react";
import { CreatePost } from ".";

const EditPost = ({ setisShow }) => {
    return (
        <div
            className="absolute top-0 bottom-0 right-0 left-0 bg-overlay-70 overflow-y-auto justify-center"
            onClick={(e) => {
                e.stopPropagation();
                setisShow(false);
            }}
        >
            <div>
                <CreatePost edit="true" setisShow={setisShow} />
            </div>
        </div>
    );
};

export default EditPost;
