import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { authSlice } from "./slice/authSlice";



export default configureStore({
    reducer: {
        authReducer: authSlice,
    },
    middleware: () => [thunk],
});