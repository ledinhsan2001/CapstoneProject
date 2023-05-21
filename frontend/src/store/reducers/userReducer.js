const initState = {
    userData: {},
};

//action nhận thông qua dispatcher của redux
const userReducer = (state = initState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default userReducer;
