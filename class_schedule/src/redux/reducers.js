import {combineReducers } from "redux";
import {userTypeReducer} from "./userType_redux";


const rootReducer = combineReducers({
    userType: userTypeReducer,
});

export default rootReducer;
