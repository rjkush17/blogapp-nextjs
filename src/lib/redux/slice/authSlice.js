import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("auth")) || null
      : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const decoded = jwtDecode(action.payload);
      state.user = { token: action.payload, details: decoded };
      localStorage.setItem("auth", JSON.stringify(state.user));
      console.log("current user :-", state);
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("auth");
      console.log("current user :-", state);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
