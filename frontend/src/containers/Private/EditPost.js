import React from "react";
import { CreatePost } from ".";
import { useDispatch } from "react-redux";
import { delDataEdit } from "../../store/actions";

const EditPost = ({ setisShow }) => {
    const dispatch = useDispatch();
    return (
        <div
            className="absolute top-0 bottom-0 right-0 left-0 bg-overlay-70 overflow-y-auto justify-center"
            onClick={(e) => {
                e.stopPropagation();
                setisShow(false);
                dispatch(delDataEdit());
            }}
        >
            <div>
                <CreatePost edit setisShow={setisShow} />
            </div>
        </div>
    );
};

export default EditPost;
