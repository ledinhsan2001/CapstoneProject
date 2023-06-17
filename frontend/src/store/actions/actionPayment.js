import actionTypes from "./actionTypes";
import * as services from "../../services";

export const actionPayment = () => async (dispatch) => {
    try {
        const response = await services.apigetPaymentHistory();
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_PAYMENT_HISTORY,
                payment_history: response.data.data,
                total_payment: response.data.total_payment,
            });
        } else {
            dispatch({
                type: actionTypes.GET_PAYMENT_HISTORY,
                message: response.data.message,
                payment_history: null,
                total_payment: 0,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PAYMENT_HISTORY,
            payment_history: null,
            total_payment: 0,
            message: error.response.data.message,
        });
    }
};
