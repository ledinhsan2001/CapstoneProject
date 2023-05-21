import axiosConfig from "../axiosConfig";

const apiGetRealHomeTypeBS = () =>
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
const apiGetRealHomeTypeR = () =>
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

const apiRealHomeType = {
    apiGetRealHomeTypeBS,
    apiGetRealHomeTypeR,
};
export default apiRealHomeType;
