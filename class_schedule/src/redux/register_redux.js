// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstname: '',
  lastname: '',
  password: '',
  confirmPassword: '',
  phone_number: '',
  email: '',
  user_type: '',
  showPassword: false,
  showConfPassword: false,
  passwordsMatch: true,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserField(state, action) {
      const { field, value } = action.payload;
      state[field] = value;
    },
    togglePasswordVisibility(state) {
      state.showPassword = !state.showPassword;
    },
    toggleConfPasswordVisibility(state) {
      state.showConfPassword = !state.showConfPassword;
    },
    setMismatchedPasswords(state, action) {
      state.passwordsMatch = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    resetState(state) {
      return initialState;
    },
  },
});

export const {
  updateUserField,
  togglePasswordVisibility,
  toggleConfPasswordVisibility,
  setMismatchedPasswords,
  setError,
  resetState,
} = userSlice.actions;

export default userSlice.reducer;
