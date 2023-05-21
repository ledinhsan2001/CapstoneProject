import actionTypes from "../actions/actionTypes";

const initState = {
    real_homes: [],
    message: "",
    page_count: 0,
    new_posts: [],
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
        case actionTypes.GET_NEW_POST:
            return {
                ...state,
                new_posts: action.new_posts || [],
                message: action.message || "",
            };
        default:
            return state;
    }
};

export default realHomeReducer;
