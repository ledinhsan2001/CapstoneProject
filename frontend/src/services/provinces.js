import axiosConfig from "../axiosConfig";

export const apiGetProvinces = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/get-province",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
