import actionTypes from "./actionTypes";
import {
    apiGetAllRealHome,
    apiGetLimitRealHome,
    apiGetNewPost,
    apiGetRealHomeTypeBS,
    apiGetRealHomeTypeR,
    apiGetTransactionType,
    apiGetAllRHByUser,
} from "../../services/index";

// ----------------------------------------------------------
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

export const realHomeByUser = (page) => async (dispatch) => {
    try {
        const response = await apiGetAllRHByUser(page);
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_RHS_BY_USER,
                real_homes_by_user: response.data.data.data,
                page_count: response.data.data.page_count,
            });
        } else {
            dispatch({
                type: actionTypes.GET_RHS_BY_USER,
                message: response.data.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_RHS_BY_USER,
            real_homes_by_user: [],
            message: error.response.data.message,
        });
    }
};

// ----------------------------------------------------------

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

// ----------------------------------------------------------

export const realHomeTypes = () => async (dispatch) => {
    try {
        const responseBS = await apiGetRealHomeTypeBS();
        const responseR = await apiGetRealHomeTypeR();
        if (
            responseBS?.data.success === true &&
            responseR?.data.success === true
        ) {
            dispatch({
                type: actionTypes.GET_REAL_HOME_TYPES,
                real_home_types_bs: responseBS.data.data,
                real_home_types_r: responseR.data.data,
            });
        } else {
            dispatch({
                type: actionTypes.GET_REAL_HOME_TYPES,
                message_bs: responseBS.data.message,
                message_r: responseR.data.message,
                real_home_types_bs: null,
                real_home_types_r: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_REAL_HOME_TYPES,
            real_home_types_bs: null,
            real_home_types_r: null,
        });
    }
};

// ----------------------------------------------------------

export const actionTransactionType = () => async (dispatch) => {
    try {
        const response = await apiGetTransactionType();
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_TRANSACTION_TYPES,
                transaction_types: response.data.data,
            });
        } else {
            dispatch({
                type: actionTypes.GET_TRANSACTION_TYPES,
                message: response.data.message,
                transaction_types: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TRANSACTION_TYPES,
            transaction_types: null,
        });
    }
};
