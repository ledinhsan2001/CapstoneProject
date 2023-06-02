import actionTypes from "../actions/actionTypes";

const initState = {
    real_homes: [],
    message: "",
    page_count: 0,
    new_posts: [],
    transaction_types: [],
    real_home_types_bs: [],
    real_home_types_r: [],
};

const realHomeReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_RHS:
        case actionTypes.GET_RHS_LIMIT:
            return {
                ...state,
                real_homes: action.real_homes || [],
                message: action.message || "",
                page_count: action.page_count || 0,
            };
        case actionTypes.GET_RHS_BY_USER:
            return {
                ...state,
                real_homes_by_user: action.real_homes_by_user || [],
                message: action.message || "",
                page_count: action.page_count || 0,
            };
        case actionTypes.GET_NEW_POST:
            return {
                ...state,
                new_posts: action.new_posts || [],
                message: action.message || "",
            };
        case actionTypes.GET_REAL_HOME_TYPES:
            return {
                ...state,
                real_home_types_bs: action.real_home_types_bs || [],
                real_home_types_r: action.real_home_types_r || [],
                message_bs: action.message_bs || "",
                message_r: action.message_r || "",
            };
        case actionTypes.GET_TRANSACTION_TYPES:
            return {
                ...state,
                transaction_types: action.transaction_types || [],
                message: action.message || "",
            };
        default:
            return state;
    }
};

export default realHomeReducer;
