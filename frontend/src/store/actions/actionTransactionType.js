import actionTypes from "./actionTypes";
import * as services from "../../services";

export const actionTransactionType = () => async (dispatch) => {
    try {
        const response = await services.apiGetTransactionType();
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
