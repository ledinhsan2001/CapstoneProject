import axiosConfig from "../axiosConfig";

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
