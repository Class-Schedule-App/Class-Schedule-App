import { createSlice } from '@reduxjs/toolkit';

const usernameSlice = createSlice({
  name: 'username',
  initialState: '',
  reducers: {
    setUsername(state, action) {
      state = action.payload;
    },
  },
});

export const usernameActions = usernameSlice.actions;