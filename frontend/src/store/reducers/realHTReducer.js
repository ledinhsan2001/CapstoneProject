import actionTypes from "../actions/actionTypes";

const initState = {
    real_home_types: [],
    message: "",
};

const realHTReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_REAL_HOME_TYPES:
            return {
                ...state,
                real_home_types_bs: action.real_home_types_bs || [],
                real_home_types_r: action.real_home_types_r || [],
                message_bs: action.message_bs || "",
                message_r: action.message_r || "",
            };
        default:
            return state;
    }
};

export default realHTReducer;
