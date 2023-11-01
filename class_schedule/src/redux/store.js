import { configureStore } from '@reduxjs/toolkit';
import userReducer from './register_redux';

export const store = configureStore({
  reducer: {
    user: userReducer,
    // other reducers...
  },
});
