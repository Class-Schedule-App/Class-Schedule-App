import { createSlice } from '@reduxjs/toolkit';

export const user_idSlice = createSlice({
  name: 'user_id',
  initialState: {
    user_id: localStorage.getItem('user_id') || null, // Get user_id from localStorage
    // other state properties
  },
  reducers: {
    setUser: (state, action) => {
      state.user_id = action.payload.user_id;
      localStorage.setItem('user_id', action.payload.user_id); // Store user_id in localStorage
    },
    // other reducers for additional state updates
  },
});

export const { setUser } = user_idSlice.actions;

export const selectUserId = (state) => state.user.user_id;

export default user_idSlice.reducer;
