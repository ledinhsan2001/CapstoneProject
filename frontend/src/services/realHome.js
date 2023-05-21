import axiosConfig from "../axiosConfig";

export const apiGetAllRealHome = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/real-home/",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetLimitRealHome = (query) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: `/api/real-home/limit`,
                params: query,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetNewPost = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: `/api/real-home/new-post`,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
