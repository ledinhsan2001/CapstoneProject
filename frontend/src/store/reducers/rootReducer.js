import authReducer from "./authReducer";
import userReducer from "./userReducer";
import realHomeReducer from "./realHomeReducer";
import pricesReducer from "./pricesReducer";
import areasReducer from "./areasReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";
import realHTReducer from "./realHTReducer";
import transactionTypeReducer from "./transactionTypesReducer";

const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2,
};

//whitelist nói cho localStorage biết danh sách nào được giữ lại, blacklist ngược lại
const authConfig = {
    ...commonConfig,
    key: "auth",
    whitelist: ["isLoggedIn", "token"],
};

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    user: userReducer,
    real_home: realHomeReducer,
    real_home_type: realHTReducer,
    transaction_type: transactionTypeReducer,
    price: pricesReducer,
    area: areasReducer,
});

export default rootReducer;
