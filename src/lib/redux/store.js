import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice"
import favSlice from "./slice/favSlice"

export const store = configureStore({
    reducer : {
        auth : authSlice,
        fav : favSlice
    },
})