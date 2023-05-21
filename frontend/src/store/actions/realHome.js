import actionTypes from "./actionTypes";
import {
    apiGetAllRealHome,
    apiGetLimitRealHome,
    apiGetNewPost,
} from "../../services/realHome";

export const realHome = () => async (dispatch) => {
    try {
        const response = await apiGetAllRealHome();
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_RHS,
                real_homes: response.data.data,
            });
        } else {
            dispatch({
                type: actionTypes.GET_RHS,
                message: response.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_RHS,
            real_homes: null,
        });
    }
};

export const realHomeLimit = (payload) => async (dispatch) => {
    try {
        const response = await apiGetLimitRealHome(payload);
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_RHS_LIMIT,
                real_homes: response.data.data.data,
                page_count: response.data.data.page_count,
            });
        } else {
            dispatch({
                type: actionTypes.GET_RHS_LIMIT,
                message: response.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_RHS_LIMIT,
            real_homes: [],
            message: error.response.data.message,
        });
    }
};

export const newPost = () => async (dispatch) => {
    try {
        const response = await apiGetNewPost();
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                new_posts: response.data.data,
            });
        } else {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                message: response.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_NEW_POST,
            new_posts: [],
            message: error.response.data.message,
        });
    }
};
