import axiosConfig from "../axiosConfig";

export const apiGetUserPublic = (_id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/user/detail-public",
                params: { _id },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetUser = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/user/detail",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiPutUser = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "put",
                url: "/api/user/put",
                data: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
