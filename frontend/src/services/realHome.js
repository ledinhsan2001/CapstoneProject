import axiosConfig from "../axiosConfig";
import axiosDefault from "axios";
// ----------------------------------
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

export const apiGetAllRHByUser = (page) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: `/api/real-home/all-by-user`,
                params: { page: page },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

// ----------------------------------
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

// ----------------------------------
export const apiGetRealHomeTypeByTrans = (transaction_type) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: `/api/admin/real-home-type/list-re-type-by-trans-type/${transaction_type}`,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const apiGetRealHomeTypeBS = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/admin/real-home-type/list-re-type-by-trans-type/645b56517cc26519dbcaad34",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const apiGetRealHomeTypeR = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/admin/real-home-type/list-re-type-by-trans-type/645b56517cc26519dbcaad4a",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

// ----------------------------------
export const apiGetTransactionType = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/admin/transaction-type",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

// ----------------------------------
export const apiUploadImages = (images) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosDefault({
                method: "post",
                url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
                data: images,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

//create post
export const apiCreateRealHome = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "post",
                url: `/api/real-home/create`,
                data: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

//update post
export const apiUpdateRealHome = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "put",
                url: `/api/real-home/put`,
                data: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

//delete post
export const apiDeleteRealHome = ({ ...payload }) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "delete",
                url: `/api/real-home/delete`,
                data: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
