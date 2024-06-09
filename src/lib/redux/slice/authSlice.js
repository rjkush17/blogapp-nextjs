import { createSlice } from "@reduxjs/toolkit";
import { useDecodeJWT } from "@/hooks/useDecodeJWT";

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
      const userDetails = useDecodeJWT(action.payload);
      state.user = { token: action.payload, details: userDetails };
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
