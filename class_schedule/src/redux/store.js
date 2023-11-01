import { configureStore } from '@reduxjs/toolkit'
import { passwordSlice } from './password'

export const store = configureStore({
  reducer: {
    password: passwordSlice,
  },
})