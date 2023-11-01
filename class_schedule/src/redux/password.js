import { createSlice } from '@reduxjs/toolkit';

const passwordSlice = createSlice({
  name: 'password',
  initialState: '',
  reducers: {
    setPassword(state, action) {
      state = action.payload;
    },
  },
});

export const passwordActions = passwordSlice.actions;

export default passwordSlice.reducer