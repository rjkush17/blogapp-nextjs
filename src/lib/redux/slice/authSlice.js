"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("auth")) || null : null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("auth", JSON.stringify({userToken : state.user}));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
