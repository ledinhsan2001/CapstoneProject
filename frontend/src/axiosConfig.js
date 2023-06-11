import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});

//Chặn và xử lý request trước khi gửi lên server
instance.interceptors.request.use(
    function (config) {
        let parse_obj = JSON.parse(window.localStorage.getItem("persist:auth"));
        const accessToken = parse_obj.accessToken;

        config.headers.authorization = accessToken
            ? `Bearer ${accessToken}`
            : null;
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default instance;
