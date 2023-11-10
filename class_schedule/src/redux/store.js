import { configureStore } from '@reduxjs/toolkit';
import userReducer from './register_redux';
import { loginReducer } from './login_redux';
import userIDReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    userID: userIDReducer,
    // other reducers...
  },
});
