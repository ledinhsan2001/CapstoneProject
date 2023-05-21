import actionTypes from "../actions/actionTypes";

const initState = {
    transaction_types: [],
    message: "",
};

const transactionTypeReducer = (state = initState, action) => {
    switch (action.type) {
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

export default transactionTypeReducer;
