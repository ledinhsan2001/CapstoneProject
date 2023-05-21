import actionTypes from "../actions/actionTypes";

const initState = {
    prices: [],
    message: "",
};

const pricesReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_PRICES:
            return {
                ...state,
                prices: action.prices || [],
                message: action.message || "",
            };
        default:
            return state;
    }
};

export default pricesReducer;
