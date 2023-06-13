import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Item, NewPost } from "../components";
import { useState } from "react";

const SavePost = () => {
    const { saved_post, total_post, message } = useSelector(
        (state) => state.real_home
    );
    const [save_post, setsave_post] = useState([]);

    useEffect(() => {
        setsave_post(saved_post);
    }, [saved_post]);

    return (
        <div className="flex ml-[10%]">
            <div className="px-10 py-2 w-full">
                <div className="text-left text-black font-bold text-4xl pb-4">
                    Tin đăng đã lưu
                </div>
                <div className="my-2 flex justify-between items-center">
                    <h6 className="titleh6 text-left">
                        <b>{total_post}</b> tin bất động sản bạn đã lưu.
                    </h6>
                </div>
                <div className="flex mb-[100px] gap-3 w-full">
                    <div className="w-[60%]">
                        {save_post?.length === 0 && message && (
                            <div className="bg-white">{message}</div>
                        )}
                        {save_post?.length > 0 &&
                            save_post.map((item) => {
                                return (
                                    <Item
                                        key={item?.real_home._id}
                                        images={JSON.parse(
                                            item?.real_home?.images.url
                                        )}
                                        shortDescription={
                                            item?.real_home?.description
                                                .title_description
                                        }
                                        price={
                                            item?.real_home?.description.price
                                        }
                                        area={item?.real_home?.description.area}
                                        bedroom={
                                            item?.real_home?.description.bedroom
                                        }
                                        toilet={
                                            item?.real_home?.description.toilet
                                        }
                                        address={item?.real_home?.address}
                                        content={
                                            item?.real_home?.description
                                                .content_description
                                        }
                                        user={item?.real_home?.user_post}
                                        _id={item?.real_home?._id}
                                        active
                                    />
                                );
                            })}
                    </div>
                    <div className="right h-fit w-[25%] bg-white p-2">
                        <NewPost />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavePost;
