import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");

const initialState = {
    user: storedUser ? JSON.parse(storedUser) : null,
  };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser : (state, action) => {
            state.user = action.payload.user;
             localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout : (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
