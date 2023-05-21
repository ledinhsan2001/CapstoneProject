import actionTypes from "./actionTypes";
import { apiRealHomeType } from "../../services/index";

export const realHomeTypes = () => async (dispatch) => {
    try {
        const responseBS = await apiRealHomeType.apiGetRealHomeTypeBS();
        const responseR = await apiRealHomeType.apiGetRealHomeTypeR();
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
