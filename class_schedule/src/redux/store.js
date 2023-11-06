import { configureStore } from '@reduxjs/toolkit';
import userReducer from './register_redux';
import { loginReducer } from './login_redux';
import { setUserType } from './userType_redux';

export const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    userType: setUserType,
    // other reducers...
  },
});
