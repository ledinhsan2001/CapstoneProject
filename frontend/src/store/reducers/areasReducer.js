import actionTypes from "../actions/actionTypes";

const initState = {
    areas: [],
    message: "",
};

const areasReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_AREAS:
            return {
                ...state,
                areas: action.areas || [],
                message: action.message || "",
            };
        default:
            return state;
    }
};

export default areasReducer;
