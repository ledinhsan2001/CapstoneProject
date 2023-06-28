import axiosConfig from "../axiosConfig";

export const apiGetAllBlogLimit = (page_blog_id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/blog/all",
                params: page_blog_id,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetDetailBlog = (_id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/blog/detail",
                params: _id,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetAlllBlogType = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/blog-type/all",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
