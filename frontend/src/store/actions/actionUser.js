import actionTypes from "./actionTypes";
import { apiGetUser } from "../../services";

export const actionUser = () => async (dispatch) => {
    try {
        const response = await apiGetUser();
        if (response?.data.success === true) {
            dispatch({
                type: actionTypes.GET_USER,
                user_data: response.data.data,
            });
        } else {
            dispatch({
                type: actionTypes.GET_USER,
                message: response.data.message,
                user_data: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_USER,
            user_data: null,
        });
    }
};
