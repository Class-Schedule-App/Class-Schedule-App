import {combineReducers } from "redux";
import {userTypeReducer} from "./userType_redux";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    userType: userTypeReducer,
});

export default rootReducer;
